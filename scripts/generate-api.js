const { generateApi } = require("swagger-typescript-api");
const path = require("path");

generateApi({
  // Swagger 문서 URL 또는 로컬 경로로 변경하세요
  url: "http://localhost:8080/v3/api-docs",
  // input: path.resolve(__dirname, "../swagger.json"), // 로컬 파일 사용 시

  output: path.resolve(__dirname, "../src/api/generated"),
  modular: true,             // API 그룹별로 파일 분리
  httpClientType: "axios",   // axios 기반 클라이언트 생성
  extractRequestBody: true,
  extractResponseBody: true,
  extractResponseError: true,
  unwrapResponseData: true,
});
