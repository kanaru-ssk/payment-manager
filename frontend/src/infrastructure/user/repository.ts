import { type FindUserByUserId } from "@/domain/user/repository";
import { user } from "@/infrastructure/grpc/proto/user/v1/user";
import { env } from "@/env";
import { credentials } from "@grpc/grpc-js";
import { userSchema } from "@/domain/user/entity";

export const client = new user.v1.UserServiceClient(
  env.BACKEND_URL,
  credentials.createInsecure()
);

export const findUserByUserId: FindUserByUserId = async (userId) => {
  try {
    const request = new user.v1.FindUserByUserIdRequest({ user_id: userId });
    const response = await new Promise<user.v1.FindUserByUserIdResponse>(
      (resolve, reject) =>
        client.FindUserByUserId(request, (err, res) => {
          if (err || !res) {
            reject(new Error("Failed to fetch data from backend server"));
          } else {
            resolve(res);
          }
        })
    );

    const userObject = response.toObject().user;
    const parsed = userSchema.safeParse({
      userId: userObject?.user_id,
      userName: userObject?.user_name,
      email: userObject?.email,
      createdAt: new Date(userObject?.created_at?.seconds || ""),
      updatedAt: new Date(userObject?.updated_at?.seconds || ""),
    });
    if (!parsed.success) {
      return null;
    }

    return {
      userId: parsed.data.userId,
      userName: parsed.data.userName,
      email: parsed.data.email,
      createdAt: parsed.data.createdAt,
      updatedAt: parsed.data.updatedAt,
    };
  } catch (error) {
    return null;
  }
};
