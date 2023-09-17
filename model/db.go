package model

import (
	"log"
	"gorm.io/gorm"
  "gorm.io/driver/sqlite"

)

type Todo struct{
	ID int64 `json:"id"`
	Title string `json:"title"`
	Content string `json:"content"`
}

var DB *gorm.DB
var err error

func init() {
	DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatalln("database can't connect")
	}
	DB.AutoMigrate(&Todo{})
}