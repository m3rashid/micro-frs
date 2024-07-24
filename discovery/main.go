package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

const port = ":4001"
const rootFolder = "../apps"
const buildFolderName = "dist"
const configFolderName = "config"

func main() {
	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
	})

	dirs, err := os.ReadDir(rootFolder)
	if err != nil {
		fmt.Println("Could read the apps directory")
		log.Fatal(err)
	}

	for _, dir := range dirs {
		if dir.IsDir() {
			app.Use("/config/"+dir.Name(), filesystem.New(filesystem.Config{
				Root: http.Dir(fmt.Sprintf("%s/%s/%s", rootFolder, dir.Name(), configFolderName)),
			}))

			app.Use("/app/apps/"+dir.Name(), filesystem.New(filesystem.Config{
				Root:   http.Dir(fmt.Sprintf("%s/%s/%s", rootFolder, dir.Name(), buildFolderName)),
				Browse: true,
				Index:  "index.html",
			}))
		}
	}

	fmt.Println("Server running on port" + port)
	log.Fatal(app.Listen(port))
}
