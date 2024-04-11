'use server'

export const action = async (formData: FormData) => {
  console.log({
    input: formData.get('some-name'),
    select: formData.get('some-name2'),
    customSelect: formData.get('some-name3'),
  })
  return formData
}
