type FormField = {
  value: string | number;
  error: string;
}

type Form = {
  [key: string]: FormField;
}


export const validateExerciseFields = (form: Form, error: Ref<string>): boolean => {
  let allValid = true;

  // General error message for empty fields
  const fieldsMessage = 'You need to fill all the fields !'

  // Loop through each field in the form
  Object.keys(form).forEach(key => {
    const fieldValue = form[key].value;
    // console.log(form[key])
    // Check if the field is empty
    if (fieldValue === '' || fieldValue === null || fieldValue === undefined) {
      form[key].error = 'outline-red-500'
      allValid = false
    } else {
      form[key].error = ''
    }

    if(!allValid) {
      error.value = fieldsMessage
    } else {
      error.value = ''
    }
  })
  return allValid;
}