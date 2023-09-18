package db

import (
	"backend/model"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB
var err error

func init() {
	DB, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		log.Fatalln("database can't connect")
	}
	DB.AutoMigrate(&model.Todo{})
}