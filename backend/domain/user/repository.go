package user

import "context"

type UserRepository interface {
	// FindByUserId : 指定されたuserIdに基づいてユーザーを取得
	// userId: ユーザーID
	// return: ユーザー情報、またはnil
	FindUserByUserId(ctx context.Context, userId string) (*User, error)

	// CreateUser : 新しいユーザーを作成
	// user: ユーザー情報
	// return: 作成されたユーザー情報
	CreateUser(ctx context.Context, user *User) (*User, error)

	// UpdateUser : ユーザー情報を更新
	// user: 更新するユーザー情報
	// return: 更新されたユーザー情報
	UpdateUser(ctx context.Context, user *User) (*User, error)

	// DeleteUser : 指定されたuserIdのユーザーを削除
	// userId: ユーザーID
	// return: 削除の成功状態
	DeleteUser(ctx context.Context, userId string) error
}
