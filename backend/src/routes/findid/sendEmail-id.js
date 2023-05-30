const express = require('express');
const router = express.Router();
const { User } = require('../../../models');
const mail = require('../../middleware/mail');

router.post('/', async (req, res) => {
  const { email, realname } = req.body;

  try {
    const user = await User.findOne({
      where: {
        realname,
        email,
      }
    });
    const { id } = user;
  
    const mailForm = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: '안녕하세요 ALLWAYS 입니다. 아이디 찾기 결과를 알려드립니다.',
      html: `<p><h3>안녕하세요 ${realname}님,</h3></p><br>
      <p>여러분들에게 언제나 행복과 재미를 전달하고 싶은 ALLWAYS 입니다.</p><br>
      <p>${realname}님의 아이디는 <strong>${id}</strong>입니다.</p><br>
      <p>저희 사이트를 이용하면서 언제나 즐거운 시간만이 있기를 바랍니다:)</p>`,
    }

    const info = await mail.sendMail(mailForm);
    res.status(200).json({ message: '아이디가 이메일로 전송되었습니다.' });
  } catch (error) {
    
    res.status(500).send({ message: '서버 오류가 발생했습니다.' });
  }
});


module.exports = router;

