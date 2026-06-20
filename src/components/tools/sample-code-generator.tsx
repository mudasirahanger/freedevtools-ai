"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

type Language = "PHP" | "Python" | "Go" | "Node.js" | "Java";
type FrameworksMap = { [key in Language]: string[] };

const frameworksData: FrameworksMap = {
  PHP: ["Laravel (v11)", "CodeIgniter (v4)"],
  Python: ["Django (v5)", "Flask (v3)"],
  "Node.js": ["Express (v4)", "NestJS (v10)"],
  Go: ["Gin (v1.9)", "Fiber (v2)"],
  Java: ["Spring Boot (v3)", "Javalin (v6)"]
};

const codeTypes = ["Add Class", "Add Function", "Add Route", "Database Connection"];

const sampleCodes: Record<string, Record<string, { code: string; desc: string; languageLabel: string }>> = {
  "Laravel (v11)": {
    "Add Class": {
      languageLabel: "php",
      code: `<?php

namespace App\\Services;

class UserService
{
    public function __construct()
    {
        // Constructor logic here
    }

    public function processUser(array $data)
    {
        // Service logic here
        return true;
    }
}`,
      desc: "This sample shows how to define a typical service class in Laravel, utilizing PHP namespaces and dependency injection concepts."
    },
    "Add Function": {
      languageLabel: "php",
      code: `public function calculateTotal(array $items): float
{
    $total = 0;
    foreach ($items as $item) {
        $total += $item['price'] * $item['quantity'];
    }
    return $total;
}`,
      desc: "A standard PHP function demonstrating type hinting for arguments and return types."
    },
    "Add Route": {
      languageLabel: "php",
      code: `use App\\Http\\Controllers\\UserController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users', [UserController::class, 'store'])->name('users.store');`,
      desc: "Defining web routes in Laravel 11 using the Route facade mapping to controller actions."
    },
    "Database Connection": {
      languageLabel: "php",
      code: `use Illuminate\\Support\\Facades\\DB;

$users = DB::table('users')->where('active', 1)->get();`,
      desc: "Using Laravel's Query Builder DB facade to interact with the database efficiently."
    }
  },
  "CodeIgniter (v4)": {
    "Add Class": {
      languageLabel: "php",
      code: `<?php namespace App\\Libraries;

class UserLibrary
{
    public function doSomething()
    {
        return 'Hello World';
    }
}`,
      desc: "A simple custom library class in CodeIgniter 4 utilizing proper namespaces."
    },
    "Add Function": {
      languageLabel: "php",
      code: `public function getUserData(int $id)
{
    $db = \\Config\\Database::connect();
    $builder = $db->table('users');
    return $builder->where('id', $id)->get()->getRow();
}`,
      desc: "A function demonstrating basic logic handling inside a CI4 model or controller."
    },
    "Add Route": {
      languageLabel: "php",
      code: `$routes->get('users', 'UserController::index');
$routes->post('users/create', 'UserController::create');`,
      desc: "Defining routes in CodeIgniter 4 configuration file."
    },
    "Database Connection": {
      languageLabel: "php",
      code: `$db = \\Config\\Database::connect();
$query = $db->query('SELECT name, title, email FROM my_table');
$results = $query->getResult();`,
      desc: "Connecting to the database and executing raw queries using CI4's Database Config."
    }
  },
  "Django (v5)": {
    "Add Class": {
      languageLabel: "python",
      code: `from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    
    def __str__(self):
        return self.user.username`,
      desc: "A Django model class representation using Django's ORM fields."
    },
    "Add Function": {
      languageLabel: "python",
      code: `def get_active_users():
    """Returns a queryset of all active users."""
    return User.objects.filter(is_active=True)`,
      desc: "A utility function interacting with Django models."
    },
    "Add Route": {
      languageLabel: "python",
      code: `from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.article_list, name='article_list'),
    path('articles/<int:pk>/', views.article_detail, name='article_detail'),
]`,
      desc: "URL routing in Django using path() and mapping to view functions."
    },
    "Database Connection": {
      languageLabel: "python",
      code: `# Configured in settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydatabase',
        'USER': 'mydatabaseuser',
        'PASSWORD': 'mypassword',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}`,
      desc: "Standard Django database configuration inside settings.py."
    }
  },
  "Flask (v3)": {
    "Add Class": {
      languageLabel: "python",
      code: `class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        
    def to_dict(self):
        return {"username": self.username, "email": self.email}`,
      desc: "A basic Python class often used to represent objects or resources in Flask applications."
    },
    "Add Function": {
      languageLabel: "python",
      code: `from flask import jsonify

def json_response(data, status=200):
    return jsonify({"data": data, "status": "success"}), status`,
      desc: "A helper function utilizing Flask's jsonify to standardize API responses."
    },
    "Add Route": {
      languageLabel: "python",
      code: `from flask import Flask, request

app = Flask(__name__)

@app.route('/api/users', methods=['GET', 'POST'])
def manage_users():
    if request.method == 'POST':
        return "Creating user..."
    return "List of users"`,
      desc: "Defining routes in Flask using the @app.route decorator."
    },
    "Database Connection": {
      languageLabel: "python",
      code: `from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
db = SQLAlchemy(app)`,
      desc: "Setting up a database connection in Flask using the popular Flask-SQLAlchemy extension."
    }
  },
  "Express (v4)": {
    "Add Class": {
      languageLabel: "javascript",
      code: `class UserService {
  constructor(dbModel) {
    this.dbModel = dbModel;
  }

  async findUserById(id) {
    return await this.dbModel.findById(id);
  }
}

module.exports = UserService;`,
      desc: "A JavaScript class demonstrating the service pattern in Express."
    },
    "Add Function": {
      languageLabel: "javascript",
      code: `const validateEmail = (email) => {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email);
};

module.exports = { validateEmail };`,
      desc: "A utility function exported as a module in Node.js."
    },
    "Add Route": {
      languageLabel: "javascript",
      code: `const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.json({ message: "List of users" });
});

router.post('/users', (req, res) => {
  res.status(201).json({ message: "User created" });
});

module.exports = router;`,
      desc: "Defining application routes using Express Router."
    },
    "Database Connection": {
      languageLabel: "javascript",
      code: `const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error', err));`,
      desc: "Connecting to a MongoDB database in an Express application using Mongoose."
    }
  },
  "NestJS (v10)": {
    "Add Class": {
      languageLabel: "typescript",
      code: `import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}`,
      desc: "A typical NestJS service class with the @Injectable decorator for dependency injection."
    },
    "Add Function": {
      languageLabel: "typescript",
      code: `function calculateDiscount(price: number, discountPercent: number): number {
  return price - (price * (discountPercent / 100));
}`,
      desc: "A strongly-typed TypeScript function."
    },
    "Add Route": {
      languageLabel: "typescript",
      code: `import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @Post()
  create(@Body() createUserDto: any): string {
    return 'This action adds a new user';
  }
}`,
      desc: "Defining routes in NestJS using Controller and HTTP method decorators."
    },
    "Database Connection": {
      languageLabel: "typescript",
      code: `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'mydb',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}`,
      desc: "Configuring a database connection in NestJS using TypeORM."
    }
  },
  "Gin (v1.9)": {
    "Add Class": {
      languageLabel: "go",
      code: `package models

type User struct {
    ID        uint   \`json:"id"\`
    Username  string \`json:"username"\`
    Email     string \`json:"email"\`
    CreatedAt string \`json:"created_at"\`
}`,
      desc: "Go doesn't have classes. Instead, we define structs to represent data models with JSON tags."
    },
    "Add Function": {
      languageLabel: "go",
      code: `func CalculateTax(amount float64, rate float64) float64 {
    return amount * (rate / 100)
}`,
      desc: "A simple function in Go demonstrating typed parameters and return values."
    },
    "Add Route": {
      languageLabel: "go",
      code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()
    
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "pong",
        })
    })
    
    r.Run(":8080")
}`,
      desc: "Defining a simple GET route using the Gin framework in Go."
    },
    "Database Connection": {
      languageLabel: "go",
      code: `package main

import (
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "log"
)

func ConnectDB() *gorm.DB {
    dsn := "host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable TimeZone=Asia/Shanghai"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("failed to connect database")
    }
    return db
}`,
      desc: "Connecting to a Postgres database in Go using the popular GORM library."
    }
  },
  "Fiber (v2)": {
    "Add Class": {
      languageLabel: "go",
      code: `package main

type Product struct {
    Name  string \`json:"name"\`
    Price int    \`json:"price"\`
}`,
      desc: "A struct representing a product model, commonly used in place of classes in Go."
    },
    "Add Function": {
      languageLabel: "go",
      code: `func ResponseJSON(c *fiber.Ctx, status int, data interface{}) error {
    return c.Status(status).JSON(data)
}`,
      desc: "A helper function for formatting JSON responses in Fiber."
    },
    "Add Route": {
      languageLabel: "go",
      code: `package main

import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hello, World!")
    })

    app.Listen(":3000")
}`,
      desc: "Defining a simple route using Fiber, an Express-inspired web framework written in Go."
    },
    "Database Connection": {
      languageLabel: "go",
      code: `import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

func InitDB() *sql.DB {
    db, err := sql.Open("mysql", "user:password@/dbname")
    if err != nil {
        panic(err)
    }
    return db
}`,
      desc: "Connecting to a MySQL database using Go's standard database/sql package."
    }
  },
  "Spring Boot (v3)": {
    "Add Class": {
      languageLabel: "java",
      code: `package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {
    @Id
    private Long id;
    private String name;

    public User() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
}`,
      desc: "A Java JPA Entity class representing a database table in Spring Boot."
    },
    "Add Function": {
      languageLabel: "java",
      code: `public String formatGreeting(String name) {
    if (name == null || name.isEmpty()) {
        return "Hello, Guest!";
    }
    return "Hello, " + name + "!";
}`,
      desc: "A standard Java method illustrating basic logic."
    },
    "Add Route": {
      languageLabel: "java",
      code: `package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello World!";
    }
}`,
      desc: "Defining a RESTful endpoint in Spring Boot using @RestController and @GetMapping annotations."
    },
    "Database Connection": {
      languageLabel: "java",
      code: `# src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=secret
spring.jpa.hibernate.ddl-auto=update`,
      desc: "Configuring the database connection in a Spring Boot application via application.properties."
    }
  },
  "Javalin (v6)": {
    "Add Class": {
      languageLabel: "java",
      code: `public class ErrorResponse {
    public int status;
    public String message;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
}`,
      desc: "A simple Java DTO (Data Transfer Object) class used for structured responses."
    },
    "Add Function": {
      languageLabel: "java",
      code: `public static boolean isValidPort(int port) {
    return port > 0 && port <= 65535;
}`,
      desc: "A static utility method in Java."
    },
    "Add Route": {
      languageLabel: "java",
      code: `import io.javalin.Javalin;

public class HelloWorld {
    public static void main(String[] args) {
        var app = Javalin.create().start(7070);
        app.get("/", ctx -> ctx.result("Hello World"));
    }
}`,
      desc: "Creating an application and defining a basic GET route using the lightweight Javalin framework."
    },
    "Database Connection": {
      languageLabel: "java",
      code: `import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:postgresql://localhost/test");
config.setUsername("user");
config.setPassword("password");

HikariDataSource ds = new HikariDataSource(config);`,
      desc: "Connecting to a database in Java using the HikariCP connection pooling library."
    }
  }
};

export default function SampleCodeGenerator() {
  const [language, setLanguage] = useState<Language>("PHP");
  const [framework, setFramework] = useState<string>("Laravel (v11)");
  const [codeType, setCodeType] = useState<string>("Add Class");
  const [copied, setCopied] = useState(false);

  const handleLanguageChange = (val: Language) => {
    setLanguage(val);
    setFramework(frameworksData[val][0]);
  };

  const handleCopy = () => {
    const data = sampleCodes[framework]?.[codeType]?.code;
    if (data) {
      navigator.clipboard.writeText(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeSnippet = sampleCodes[framework]?.[codeType];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <Select value={language} onValueChange={(val: string | null) => { if(val) handleLanguageChange(val as Language) }}>
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(frameworksData).map((lang) => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Framework</label>
          <Select value={framework} onValueChange={(val: string | null) => { if(val) setFramework(val) }}>
            <SelectTrigger>
              <SelectValue placeholder="Select Framework" />
            </SelectTrigger>
            <SelectContent>
              {frameworksData[language].map((fw) => (
                <SelectItem key={fw} value={fw}>{fw}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sample Code Type</label>
          <Select value={codeType} onValueChange={(val: string | null) => { if(val) setCodeType(val) }}>
            <SelectTrigger>
              <SelectValue placeholder="Select Code Type" />
            </SelectTrigger>
            <SelectContent>
              {codeTypes.map((ct) => (
                <SelectItem key={ct} value={ct}>{ct}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="bg-muted px-4 py-3 border-b flex justify-between items-center">
          <h3 className="font-medium text-sm flex items-center gap-2">
            Generated Output 
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-mono">
              {activeSnippet?.languageLabel || "text"}
            </span>
          </h3>
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied ? "Copied!" : <><Copy className="w-3 h-3 mr-2" /> Copy Code</>}
          </Button>
        </div>
        <div className="p-4 bg-zinc-950 text-zinc-50 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed whitespace-pre">
            {activeSnippet?.code || "// Code snippet not found"}
          </pre>
        </div>
      </div>

      <div className="bg-muted/50 border rounded-lg p-4">
        <h4 className="text-sm font-semibold mb-1">Description</h4>
        <p className="text-sm text-muted-foreground">
          {activeSnippet?.desc || "Description for the selected snippet will appear here."}
        </p>
      </div>
    </div>
  );
}
