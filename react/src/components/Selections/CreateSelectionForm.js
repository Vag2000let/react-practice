import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'

function CreateSelectionForm() {
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: errors } = useForm()

  const onSubmit = async ({selectionAuthor, selectionEmail, selectionName}) => {
    debugger
    dispatch({ type: "CREATE_SELECTION", payload: {
      title: selectionName,
      author: selectionAuthor,
      email: selectionEmail
    }})
  }

  return (
    <div className="create_selection_form_wrapper">
      <form className="create_selection_form row" onSubmit={handleSubmit(onSubmit)}>
        <div className="create_selection_input col-md-4" >
          <label htmlFor="selectionName" className="form-label">Selection Title</label>
          <input type="text" className="form-control" id="selectionName" name="selectionName" {...register('selectionName', { required: true, maxLength: 10 })} />
          {errors?.selectionName && <span className="form_error">{errors.selectionName}</span>}
        </div>
        <div className="create_selection_input col-md-4">
          <label htmlFor="selectionAuthor" className="form-label">Selection Author</label>
          <input type="text" className="form-control" id="selectionAuthor" {...register('selectionAuthor', { required: true })} />
          {errors?.selectionAuthor && <span className="form_error">{errors.selectionAuthor}</span>}
        </div>
        <div className="create_selection_input col-md-4">
          <label htmlFor="selectionEmail" className="form-label">E-mail</label>
          <input type="text" className="form-control" id="selectionEmail" {...register('selectionEmail', { required: false })} />
          {errors?.selectionEmail && <span className="form_error">{errors.selectionEmail}</span>}
        </div>
        {JSON.stringify(errors)}
        <div className="create_selection_form_add_btn_wrapper">
          <button type="submit" className="btn btn-primary">Create selection</button>
        </div>
      </form>
    </div>
  )
}

export default CreateSelectionForm