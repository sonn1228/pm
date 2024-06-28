// button-delete
const btnDelete = document.querySelectorAll('[button-delete]');
if (btnDelete.length > 0) {
  btnDelete.forEach(button => {
    button.addEventListener('click', () => {
      // form-delete-item
      const formDelete = document.querySelector('[form-delete-item]');
      const id = button.getAttribute('data-id');
      if (formDelete) {
        formDelete.action += `/${id}?_method=DELETE`;
        console.log(formDelete.action);
        formDelete.submit();
      }
    })
  })
}

// button-delete

// form-change-status
const btnChangeStatus = document.querySelectorAll('[button-change-status]');
if (btnChangeStatus.length > 0) {
  btnChangeStatus.forEach(button => {
    button.addEventListener('click', () => {
      const formChangeStatus = document.querySelector('[form-change-status]');
      if (formChangeStatus) {
        const id = button.getAttribute('data-id');
        const status = button.getAttribute('data-status');
        formChangeStatus.action += `/${status}/${id}?_method=patch`;
        formChangeStatus.submit();
      }
    })
  })
}

// end form-change-status

// checkbox-multi
const checkboxMulti = document.querySelector('[checkbox-multi]');
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector('input[name="checkAll"]');
  const inputCheckItems = checkboxMulti.querySelectorAll('input[name="checkboxItem"]');
  inputCheckAll.addEventListener('click', () => {
    if (inputCheckAll.checked) {
      inputCheckItems.forEach(input => {
        input.checked = true;
      })
    }
    else {
      inputCheckItems.forEach(input => {
        input.checked = false;
      })
    }
  })
  inputCheckItems.forEach(input => {
    input.addEventListener('click', () => {
      const countInputChecked = checkboxMulti.querySelectorAll('input[name="checkboxItem"]:checked').length;
      if (countInputChecked == inputCheckItems.length) {
        inputCheckAll.checked = true;
      }
      else {
        inputCheckAll.checked = false;
      }
    })
  })
}


// end checkbox-multi

// button-click-action
const formChangeMulti = document.querySelector('[form-change-multi]');
if (formChangeMulti) {
  formChangeMulti.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputIds = formChangeMulti.querySelector('input[name="ids"]');
    const ids = [];
    const countInputChecked = checkboxMulti.querySelectorAll('input[name="checkboxItem"]:checked');
    countInputChecked.forEach(input => {
      ids.push(input.getAttribute('data-id'));
    })
    inputIds.value = ids.join('-');
    const actionValue = e.target.elements.action.value;
    if (actionValue) {

      formChangeMulti.submit();
    }
    else {
      alert("Vui lòng chọn hành động");
    }
  })
}

// end button-click-action