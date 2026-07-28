import "./FieldForm.css"

export const FieldForm = ({labelText , type = "text", name, required = true}) => {
  return(
    `
    <div class="field-form">
    <label>${labelText}</label>
    <input name="${name}" type="${type}" required = "${required}" />
    
    </div>
  `
  )
}
  
 
