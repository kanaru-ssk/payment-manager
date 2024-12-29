import { type FindUserByUserId } from "@/domain/user/repository";
import { user } from "@/infrastructure/grpc/proto/user/v1/user";
import { env } from "@/env";
import { credentials } from "@grpc/grpc-js";
import { userSchema } from "@/domain/user/entity";
import { toMilliseconds } from "@/lib/timestamp";

const client = new user.v1.UserServiceClient(
  env.BACKEND_URL,
  env.NODE_ENV === "production"
    ? credentials.createSsl()
    : credentials.createInsecure()
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

    const parsed = userSchema.safeParse({
      userId: response.user.user_id,
      userName: response.user.user_name,
      email: response.user.email,
      createdAt: new Date(toMilliseconds(response.user.created_at)),
      updatedAt: new Date(toMilliseconds(response.user.updated_at)),
    });
    if (!parsed.success) {
      console.log(parsed.error);
      return null;
    }

    return {
      userId: parsed.data.userId,
      userName: parsed.data.userName,
      email: parsed.data.email,
      createdAt: parsed.data.createdAt,
      updatedAt: parsed.data.updatedAt,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
