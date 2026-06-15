export const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prevData => ({...prevData, [name]: value}))
}