package persistence

import (
	"context"
	"database/sql"
	_ "embed"

	"github.com/google/uuid"
	"github.com/kanaru-ssk/payment-manager/backend/domain/user"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(
	db *sql.DB,
) user.UserRepository {
	return &UserRepository{db: db}
}

//go:embed user_repository_find_user_by_user_id.sql
var find_user_by_user_id string

func (r *UserRepository) FindUserByUserId(ctx context.Context, userId uuid.UUID) (*user.User, error) {
	var u user.User
	if err := r.db.QueryRow(find_user_by_user_id, userId).Scan(&u.UserId, &u.UserName, &u.Email, &u.CreatedAt, &u.UpdatedAt); err != nil {
		return nil, err
	}

	return &user.User{
		UserId:    u.UserId,
		UserName:  u.UserName,
		Email:     u.Email,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}, nil
}

//go:embed user_repository_find_user_by_email.sql
var find_user_by_email string

func (r *UserRepository) FindUserByEmail(ctx context.Context, email user.Email) (*user.User, error) {
	var u user.User
	if err := r.db.QueryRow(find_user_by_email, email).Scan(&u.UserId, &u.UserName, &u.Email, &u.CreatedAt, &u.UpdatedAt); err != nil {
		return nil, err
	}

	return &user.User{
		UserId:    u.UserId,
		UserName:  u.UserName,
		Email:     u.Email,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}, nil
}

//go:embed user_repository_create_user.sql
var create_user string

func (r *UserRepository) CreateUser(ctx context.Context, userName string, email user.Email) (*user.User, error) {
	var u user.User
	if err := r.db.QueryRow(create_user, userName, email).Scan(&u.UserId, &u.UserName, &u.Email, &u.CreatedAt, &u.UpdatedAt); err != nil {
		return nil, err
	}
	return &user.User{
		UserId:    u.UserId,
		UserName:  u.UserName,
		Email:     u.Email,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}, nil
}

//go:embed user_repository_update_user.sql
var update_user string

func (r *UserRepository) UpdateUser(ctx context.Context, userId uuid.UUID, userName string, email user.Email) (*user.User, error) {
	var u user.User
	if err := r.db.QueryRow(update_user, userId, userName, email).Scan(&u.UserId, &u.UserName, &u.Email, &u.CreatedAt, &u.UpdatedAt); err != nil {
		return nil, err
	}
	return &user.User{
		UserId:    u.UserId,
		UserName:  u.UserName,
		Email:     u.Email,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}, nil
}

//go:embed user_repository_delete_user.sql
var delete_user string

func (r *UserRepository) DeleteUser(ctx context.Context, userId uuid.UUID) error {
	_, err := r.db.Exec(delete_user, userId)
	if err != nil {
		return err
	}
	return nil
}
