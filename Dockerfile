# Node.js 이미지를 기반으로 사용합니다.
FROM node:18

# 애플리케이션 디렉토리 생성
WORKDIR /app

# package.json과 package-lock.json 파일 복사
COPY package*.json ./

# 종속성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# 애플리케이션 빌드 (필요한 경우)
# RUN npm run build

# 개발 서버를 시작합니다.
CMD ["npm", "run", "dev"]

# 포트 노출 (기본적으로 npm run dev는 3000번 포트를 사용)
EXPOSE 3000
