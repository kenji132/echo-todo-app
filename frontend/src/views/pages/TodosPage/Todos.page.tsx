import { Button } from "@chakra-ui/react"

export const Todos = () => {
  return (
    <>
      <h1>Todo index</h1>
      <Button colorScheme="teal" onClick={() => {
        fetch("http://localhost:1323/todos")
          .then(res => {
            if (!res.ok) {
              throw new Error('APIレスポンスがエラーを返しました。');
            }
            return res.json();
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('APIリクエストエラー:', error);
          });
      }}>
        Get Todos
      </Button>
    </>
  )
}

