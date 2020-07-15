const rules = {
  name: [
    { required: true, message: 'El nombre es requerido', trigger: 'blur' }
  ],
  code: [
    { required: true, message: 'El codigo es requerido', trigger: 'blur' }
  ],
  faculty: [
    { required: true, message: 'Facultad es requerido', trigger: 'blur' }
  ]
}

export default rules

export function arrayCheckZero (arrayData) {
  const courses = []
  if (arrayData.length) {
    arrayData.forEach((item) => {
      courses.push({ _id: item.value, name: item.label })
    })
  }
  return courses
}

export function arrayCheck (arrayData) {
  const courses = []
  let failed = false
  arrayData.forEach((itemArray) => {
    if (itemArray.length) {
      itemArray.forEach((item) => {
        courses.push({ _id: item.value, name: item.label })
      })
    } else {
      failed = true
    }
  })
  return !failed ? courses : []
}
