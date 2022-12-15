import {useDispatch} from "react-redux";
import { Field, Formik } from 'formik'
import * as Yup from 'yup'

function CreateBookForm() {
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
      dispatch({ type: "CREATE_BOOK", payload: {
        title: values.bookName,
        author: values.bookAuthor,
      }})
  }

  const CreateBookSchema = Yup.object().shape({
    bookName: Yup.string()
      .matches(/[a-zA-Z\s]+/gi, 'Введите только буквы!')
      .min(5, 'Имя слишком короткое')
      .max(10, 'Имя слишком длинное')
      .required('Field is required')
  })

  const CustomField = ({ errors, name, label, type = 'text', children }) => {
    const data = 'test'
    const testAlert = () => {
      alert('Hi from custoim field')
    }
    if (children) {
      return children({ errors, name, label, data, testAlert })
    }

    return (
      <div className="create_book_input col-md-6" >
        <label htmlFor="bookName" className="form-label">{label}</label>
        <Field type={type} name={name} className="form-control" />
        {errors[name] && <span className="form_error">{errors[name]}</span>}
      </div>
    )
  }

  const validateForm = (values) => {
    const errors = {}

    if (values.bookName === '') {
      errors.bookName = 'Field is required'
    }

    if (values.bookAuthor === '') {
      errors.bookAuthor = 'Field is required'
    }

    return errors
  }


  return (
    <div className="create_book_form_wrapper">
      <Formik initialValues={{ bookName: '', bookAuthor: '' }} onSubmit={onSubmit} validationSchema={CreateBookSchema}>
        {({values, handleChange, handleBlur, handleSubmit, errors}) => (
            <form className="create_book_form row" onSubmit={handleSubmit}>
            <CustomField errors={errors} name='bookName' label='Book Title' />
            {/* <div className="create_book_input col-md-6" >
              <label htmlFor="bookName" className="form-label">Book Title</label>
              <input value={values.bookName} name="bookName" type="text" className="form-control" id="bookName"
                    onChange={handleChange} onBlur={handleBlur} />
              <Field type='text' name="bookName" className="form-control" />
              {errors.bookName && <span className="form_error">{errors.bookName}</span>}
            </div> */}
            <CustomField errors={errors} name='bookAuthor' label='Book Author' />
            {/* <div className="create_book_input col-md-6">
              <label htmlFor="bookAuthor" className="form-label">Book Author</label>
              <input value={values.bookAuthor} name="bookAuthor" type="text" className="form-control" id="bookAuthor"
                    onChange={handleChange} onBlur={handleBlur} />
              <Field type='text' name="bookAuthor" className="form-control" />
              {errors.bookAuthor && <span className="form_error">{errors.bookAuthor}</span>}
            </div> */}
            <div className="create_book_form_add_btn_wrapper">
                <button type="submit" className="btn btn-primary" data-testid="create_book_button">Create book</button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default CreateBookForm