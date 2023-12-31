package main

import (
	"backend/db"
	"backend/model"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func connect(c echo.Context) error {
	db, _ := db.DB.DB()
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
	e.Use(middleware.CORS())
	e.GET("/", connect)
	
	// routing
	e.GET("/todos", getAllTodos)
	e.POST("/todos", createTodo)
	e.GET("/todos/:id", getTodo)
	e.PUT("/todos/:id", updateTodo)
	e.DELETE("/todos/:id", deleteTodo)

	// log
	e.Logger.Fatal(e.Start(":1323"))
}

func getAllTodos(c echo.Context) error {
	todos := []model.Todo{}
	db.DB.Find(&todos)
	return c.JSON(http.StatusOK, todos)
}

func getTodo(c echo.Context) error {
	id := c.Param("id")
	todo := model.Todo{}
	if db.DB.Find(&todo, id).RowsAffected == 0 {
		fmt.Println("error detected! ErrRecordNotFound")
		return nil
	}
	return c.JSON(http.StatusOK, todo)
}

func createTodo(c echo.Context) error {
	todo := model.Todo{}
	if err := c.Bind(&todo); err != nil {
		return err
	}
	db.DB.Create(&todo)
	return c.JSON(http.StatusOK, todo)
}

func updateTodo(c echo.Context) error {
	id := c.Param("id")
	todo := model.Todo{}
	db.DB.Find(&todo, id)
	if err := c.Bind(&todo); err != nil {
		return err
	}
	db.DB.Save(&todo)
	return c.JSON(http.StatusOK, todo)
}

func deleteTodo(c echo.Context) error {
	id := c.Param("id")
	todo := model.Todo{}
	db.DB.Delete(&todo, id)
	res := map[string]string{
		"message": "削除が成功しました",
		"deleted_id": id,
	}
	return c.JSON(http.StatusOK, res)
}