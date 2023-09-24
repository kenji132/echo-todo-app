package db

import (
	"backend/model"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB
var err error

func init() {
	dsn := "host=db user=gorm password=password dbname=todoapp port=5432 sslmode=disable"

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln("database can't connect")
	}
	DB.AutoMigrate(&model.Todo{})
}