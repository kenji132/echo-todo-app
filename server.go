package main

import (
	"myapp/model"
	"net/http"
	// "os"
	// "io"

	echo "github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type Todo struct{
	gorm.Model
	ID int64 `json:"id"`
	Title string `json:"title"`
	Content string `json:"content"`
}

func connect(c echo.Context) error {
	db, _ := model.DB.DB()
	defer db.Close()
	err := db.Ping()
	if err != nil {
		return c.String(http.StatusInternalServerError, "DB接続失敗しました")
	} else {
		return c.String(http.StatusOK, "DB接続しました")
	}
}

func main() {

	e := echo.New()
	e.GET("/", connect)
	
	// routing
	e.GET("/todos", getAllTodos)
	e.POST("/todos", createTodo)
	e.GET("/todos/:id", getTodo)
	e.PUT("/todos/:id", updateTodo)
	e.DELETE("/todos/:id", deleteTodo)

	// 最後に書く
	e.Logger.Fatal(e.Start(":1323"))
}

func getAllTodos(c echo.Context) error {
	todos := []model.Todo{}
	model.DB.Find(&todos)
	return c.JSON(http.StatusOK, todos)
}

func getTodo(c echo.Context) error {
	id := c.Param("id")
	todos := model.Todo{}
	model.DB.Find(&todos, id)
	return c.JSON(http.StatusOK, todos)
}

func createTodo(c echo.Context) error {
	todo := model.Todo{}
	if err := c.Bind(&todo); err != nil {
		return err
	}
	model.DB.Create(&todo)
	return c.JSON(http.StatusOK, todo)
}

func updateTodo(c echo.Context) error {
	id := c.Param("id")
	todo := model.Todo{}
	model.DB.Find(&todo, id)
	if err := c.Bind(&todo); err != nil {
		return err
	}
	model.DB.Save(&todo)
	return c.JSON(http.StatusOK, todo)
}

func deleteTodo(c echo.Context) error {
	id := c.Param("id")
	todo := model.Todo{}
	model.DB.Delete(&todo, id)
	res := map[string]string{
		"message": "削除が成功しました",
		"deleted_id": id,
	}
	return c.JSON(http.StatusOK, res)
}