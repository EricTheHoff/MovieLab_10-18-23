const { Rating, db } = await import('./src/model.js')

const testUser = await User.create({ email: 'test@email.com', password: 'test' })

console.log(testUser)