function randomPassword(){
  const list = "abcdefghijklmnopqrstuvwxyz013232493499349349"
  const length = Math.floor(Math.random() * (12 - 8 + 1) + 8)
  let password = ''
  for(let i=0;i<length;i++) {
    password += list[Math.round(Math.random()*40)]
  }

  return password
  
}

module.exports = randomPassword