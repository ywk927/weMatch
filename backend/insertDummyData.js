require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Project = require('./models/Project');
const Application = require('./models/Application');

const positions = [
  '웹 프론트엔드', '웹 백엔드', '모바일', '풀스택', '디자이너',
  '기획자/PM', 'QA', 'DevOps/인프라', '데이터 엔지니어', '데이터 분석가',
  '마케터', '작가/콘텐츠 에디터'
];
const skillsList = [
  'React', 'Node.js', 'Vue.js', 'Spring', 'Django', 'AWS', 'Figma',
  'Photoshop', 'MySQL', 'MongoDB', 'TypeScript', 'Python', 'Java', 'Kotlin'
];
const levels = ['초급', '중급', '고급'];

function getRandom(arr, n = 1) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return n === 1 ? shuffled[0] : shuffled.slice(0, n);
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  await Project.deleteMany({});
  await Application.deleteMany({});

  // 1. 유저 20명 생성
  const users = [];
  for (let i = 1; i <= 20; i++) {
    const skills = Array.from({ length: getRandom([1, 2, 3]) }, () => ({
      name: getRandom(skillsList),
      level: getRandom(levels)
    }));
    users.push({
      email: `user${i}@example.com`,
      password: await bcrypt.hash('test1234', 10),
      nickname: `유저${i}`,
      skills,
      position: getRandom(positions),
      image: '',
      description: `안녕하세요! 저는 유저${i}입니다.`,
      provider: 'local'
    });
  }
  const userDocs = await User.insertMany(users);

  // 2. 프로젝트 10개 생성 (작성자는 랜덤 유저)
  const projects = [];
  for (let i = 1; i <= 10; i++) {
    projects.push({
      title: `프로젝트${i}`,
      description: `이것은 프로젝트${i}의 설명입니다.`,
      skills: getRandom(skillsList, getRandom([2, 3, 4])),
      recruitCount: getRandom([3, 4, 5]),
      creator: getRandom(userDocs)._id
    });
  }
  const projectDocs = await Project.insertMany(projects);

  // 3. 지원 30개 생성 (유저, 프로젝트 랜덤 연결, 한 유저가 여러 번 지원 가능)
  const applications = [];
  for (let i = 0; i < 30; i++) {
    const user = getRandom(userDocs);
    const project = getRandom(projectDocs);
    applications.push({
      user: user._id,
      project: project._id,
      status: getRandom(['pending', 'accepted', 'rejected']),
      message: `안녕하세요! ${project.title}에 지원합니다.`
    });
  }
  await Application.insertMany(applications);

  console.log('더미 데이터 삽입 완료!');
  process.exit();
}

main(); 