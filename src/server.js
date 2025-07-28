require("express-async-errors");
require("dotenv/config");

const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const routes = require("./routes");

// configurando a aplicação
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://foodexplorer42.netlify.app/",
    ],
    credentials: true,
  })
);

// carregar imagens
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

// habilitar rotas
app.use(routes);

// lidando com erros da aplicação e retornando uma mensagem
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

//porta do servidor
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
