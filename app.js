console.log("The Page is Linked - before dom content has loaded")

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Has Been Loaded")
  const bagelsUl = document.getElementById("bagels-ul")
  // Alternatively, you can just put the script tag at the bottom.
  // The reason we want to use this is so the user doesn't just see a blank page
  // ... while the JS is loading. Example of asynchornous operations.

  fetch("http://bagel-api-fis.herokuapp.com/bagels")
    .then(response => response.json())
    .then(result => renderBagles(result))

  function renderBagles(bagels) {
    console.log("bagels", bagels)
    bagels.map(bagel => {
      const li = document.createElement("li")
      li.innerText = bagel.type
      createDeleteButton(li)
      bagelsUl.appendChild(li)
    })
  }

  function createDeleteButton(li) {
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "delete"
    deleteButton.addEventListener("click", () => deleteBagel())
    li.appendChild(deleteButton)
  }

  function deleteBagel() {
    console.log("this is the delete bagel function")
    console.log(event)
    console.log(event.target)
    // Optimistic Rendering: UX principle where you remove from the frontend first before
    // ... the backend.
    // Pessimistic Rendering: Delete it on the backend first, which will take way longer
    // ... to render.
    event.target.parentNode.remove()
    deleteBagelFromServer()
  }

  function deleteBagelFromServer() {}
})
