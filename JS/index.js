document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const contactList = document.getElementById("contactList");
  const filterCriteria = document.getElementById("filterCriteria");
  const filterValue = document.getElementById("filterValue");
  const filterButton = document.getElementById("filterButton");

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let editIndex = -1;

  const renderContacts = (contactsToRender) => {
    contactList.innerHTML = "";
    contactsToRender.forEach((contact, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
          ${contact.name} ${contact.surname} - ${contact.phone} - ${contact.email}
          <div>
            <button onclick="editContact(${index})">Edit</button>
            <button onclick="deleteContact(${index})">Delete</button>
          </div>
        `;
      contactList.appendChild(li);
    });
  };

  const saveContacts = () => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    const newContact = { name, surname, phone, email };

    if (editIndex === -1) {
      contacts.push(newContact);
    } else {
      contacts[editIndex] = newContact;
      editIndex = -1;
    }

    saveContacts();
    renderContacts(contacts);
    contactForm.reset();
  });

  window.editContact = (index) => {
    const contact = contacts[index];
    document.getElementById("name").value = contact.name;
    document.getElementById("surname").value = contact.surname;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;
    editIndex = index;
  };

  window.deleteContact = (index) => {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts(contacts);
  };

  filterButton.addEventListener("click", () => {
    const criteria = filterCriteria.value;
    const value = filterValue.value.toLowerCase();
    const filteredContacts = contacts.filter((contact) =>
      contact[criteria].toLowerCase().includes(value)
    );
    renderContacts(filteredContacts);
  });

  renderContacts(contacts);
});
