const mongoose = require('mongoose')

const commonMemeSchema = {
    description: { type: String, default: '', text: true },
    name: { type: String, default: '' },
    tags: { type: Array, default: [] },
    id: { type: String, default: '', required: true },
    urlPath: { type: String, default: '', required: true },
    thumbPath: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    category: { type: String, default: 'general' },
    date: { type: Date, default: new Date() },
    locale: { type: String, default: '' },
    example: { type: String, default: '' },
}

const memeSchema = mongoose.Schema(commonMemeSchema)

const userGeneratedMemeSchema = mongoose.Schema({
    ...commonMemeSchema,
    isMobile: { type: String },
    isDesktop: { type: String },
    isMobileApp: { type: String },

})

const weeklyMemeSchema = mongoose.Schema({
    ...commonMemeSchema,
    week: { type: Number }
})

const suggestedMemeSchema = mongoose.Schema({
    description: { type: String, default: '', text: true },
    explanation: { type: String, default: '' },
    urlPath: { type: String, default: '' },
    userName: { type: String, default: '' },
    email: { type: String, default: '' }
})

const userReportSchema = mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    type: { type: String, default: '' },
    message: { type: String, default: '' },
    date: { type: Date, default: new Date() },
    likes: { type: Number, default: 0 },
    id: { type: String, default: '' }

})

module.exports = {
    memeSchema,
    userGeneratedMemeSchema,
    weeklyMemeSchema,
    suggestedMemeSchema,
    userReportSchema
}