package model

type Todo struct{
	ID int64 `json:"id"`
	Title string `json:"title"`
	Content string `json:"content"`
	IsDone bool `json:"is_done" gorm:"default:false"`
}
