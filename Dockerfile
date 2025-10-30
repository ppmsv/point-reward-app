# ใช้ Node 20
FROM node:20

# ตั้ง working directory
WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .

 
EXPOSE 3000

# ตั้งค่าให้ dev server รับ request จากภายนอก container
ENV HOST=0.0.0.0
ENV PORT=3000

# รันโหมดพัฒนา
CMD ["npm", "run", "dev"]