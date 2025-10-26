# ใช้ Node 20 LTS
FROM node:20

# ตั้ง working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์โปรเจกต์ทั้งหมด
COPY . .

# Build สำหรับ production
RUN npm run build

# expose port 3000
EXPOSE 3000

# รัน Nuxt preview (production)
CMD ["npm", "run", "preview"]