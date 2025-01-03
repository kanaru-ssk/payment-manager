package user

import (
	"context"
)

type UserRepository interface {
	// FindByUserId : 指定されたuserIdに基づいてユーザーを取得
	// userId: ユーザーID
	// return: ユーザー情報、またはnil
	FindUserByUserId(ctx context.Context, userId string) (*User, error)

	// FindUserByEmail : 指定されたemailに基づいてユーザーを取得
	// email: メールアドレス
	// return: ユーザー情報、またはnil
	FindUserByEmail(ctx context.Context, email Email) (*User, error)

	// CreateUser : 新しいユーザーを作成
	// userName: ユーザー名
	// email: メールアドレス
	// return: 作成されたユーザー情報
	CreateUser(ctx context.Context, user string, email Email) (*User, error)

	// UpdateUser : ユーザー情報を更新
	// userName: 新しいユーザー名
	// email: 新しいメールアドレス
	// return: 更新されたユーザー情報
	UpdateUser(ctx context.Context, userId string, userName string, email Email) (*User, error)

	// DeleteUser : 指定されたuserIdのユーザーを削除
	// userId: ユーザーID
	// return: 削除の成功状態
	DeleteUser(ctx context.Context, userId string) error
}
