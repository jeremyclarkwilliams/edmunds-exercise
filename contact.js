(function() {

  // temp data
  var CONTACTS = [{"name":"Amar","email":"amardeep@live.com","phone":"408-555-1234","address1":"555 Halford Ave.","address2":"Apartment #43C","city":"Santa Clara","state":"CA","zip":"95051","avatar":"amar.gif"},{"name":"Deepa","email":"deepa@yahoo.com","phone":"408-555-1234","address1":"1234 Montcalm St.","address2":"","city":"Chula Vista","state":"CA","zip":"91911","avatar":"deepa.gif"},{"name":"Eric","email":"eric@ericrules.com","phone":"408-555-1234","address1":"10 Candyland","address2":"","city":"North Pole","state":"PA","zip":"87996","avatar":"eric.gif"},{"name":"Gregor","email":"gregor@gmail.com","phone":"897-984-3145","address1":"Gregor Insurance Co.","address2":"1234 Strip St.","city":"New York","state":"NY","zip":"45879","avatar":"gregor.gif"},{"name":"Jeff","email":"jeff@aol.com","phone":"408-555-1234","address1":"1234 Montcalm St.","address2":"","city":"Chula Vista","state":"CA","zip":"91911","avatar":"jeff.gif"},{"name":"Jen","email":"jen@ebay.com","phone":"408-555-1234","address1":"1234 Lily St.","address2":"","city":"San Diego","state":"CA","zip":"91911","avatar":"jen.gif"},{"name":"Katie","email":"katie@ask.com","phone":"408-555-1234","address1":"949 Thunk Ct.","address2":"","city":"Sacramento","state":"CA","zip":"95826","avatar":"katie.gif"},{"name":"Vivian","email":"vivian@altavista.com","phone":"650-458-1234","address1":"949 FooBar St.","address2":"","city":"San Mateo","state":"CA","zip":"98745","avatar":"vivian.gif"}];

  function populateContacts() {
    var list = document.getElementById('widget-contacts-list');
    CONTACTS.forEach(function(contact, index) {
      var item = createContact(contact, index);
      addHovers(item);
      list.appendChild(item);
    });
  }

  function addHovers(item) {
    item.addEventListener('mouseenter', function(e) {
      addClass([this], 'hover');
    });
    item.addEventListener('mouseleave', function(e) {
      removeClass([this], 'hover');
    });
  }

  function createContact(contact, index) {
    var item = document.createElement('li'),
        name = createContactName(contact),
        secondary = createContactSecondary(contact);
    item.className = 'contacts__item';
    // item.setAttribute('data-entry', index);
    item.appendChild(name);
    item.appendChild(secondary);
    return item;
  }

  function createContactName(contact) {
    var name = document.createElement('h2');
    name.className = 'contacts__info contacts__info--name';
    name.innerHTML = contact.name;
    return name;
  }

  function createContactSecondary(contact) {
    var container = document.createElement('div'),
        secondary = document.createElement('div'),
        avatar = createContactAvatar(contact),
        email = createContactEmail(contact),
        phone = createContactPhone(contact),
        address = createContactAddress(contact),
        cityStateZip = createContactCityStateZip(contact),
        links = createContactLinks(contact);
    container.className = 'contacts__info contacts__info--container';
    secondary.className = 'contacts__info contacts__info--secondary';
    secondary.appendChild(avatar);
    secondary.appendChild(email);
    secondary.appendChild(phone);
    secondary.appendChild(address);
    secondary.appendChild(cityStateZip);
    secondary.appendChild(links);
    container.appendChild(secondary);
    return container;
  }

  function createContactEmail(contact) {
    var email = createLink('mailto:' + contact.email, contact.email);
    email.className = 'contacts__secondary contacts__email show';
    return email;
  }

  function createContactPhone(contact) {
    var phone = document.createElement('p');
    phone.className = 'contacts__secondary contacts__phone';
    phone.innerHTML = contact.phone;
    return phone;
  }

  function createContactAddress(contact) {
    var address = document.createElement('p'),
        mapLink = createLink('#', 'map');
    address.className = 'contacts__secondary';
    address.innerHTML = contact.address1;
    if (contact.address2 !== '') {
      address.innerHTML += ' ' + contact.address2;
    }
    address.innerHTML += ' - ';
    address.appendChild(mapLink);
    return address;
  }

  function createContactCityStateZip(contact) {
    var cityStateZip = document.createElement('p');
    cityStateZip.className = 'contacts__secondary';
    cityStateZip.innerHTML = contact.city + ', ' + contact.state + ' ' + contact.zip;
    return cityStateZip;
  }

  function createContactLinks(contact) {
    var links = document.createElement('p'),
        chats = createLink('#', 'Chats'),
        emails = createLink('#', 'Emails');
    links.className = 'contacts__secondary';
    links.appendChild(chats);
    links.innerHTML += ' - ';
    links.appendChild(emails);
    return links;
  }

  function createContactAvatar(contact) {
    var avatar = document.createElement('img');
    avatar.className = 'contacts__avatar';
    avatar.src = 'images/' + contact.avatar;
    avatar.alt = contact.name + "'s Avatar";
    return avatar;
  }

  function createLink(href, inner) {
    var link = document.createElement('a');
    link.href = href;
    link.innerHTML = inner;
    return link;
  }

  populateContacts();

  // toggle email/phone
  var contactsFormSelect = document.getElementById('contacts-form-select'),
      contactsEmails = document.querySelectorAll('#widget-contacts-list .contacts__email'),
      contactsPhones = document.querySelectorAll('#widget-contacts-list .contacts__phone'),
      contactsSecondaryHdr = document.querySelector('h3.contacts__hdr');
  contactsFormSelect.addEventListener('change', function(e) {
    switch (this.value) {
      case 'email':
        addClass(contactsEmails, 'show');
        removeClass(contactsPhones, 'show');
        contactsSecondaryHdr.innerHTML = 'Email';
        break;
      case 'phone':
        addClass(contactsPhones, 'show');
        removeClass(contactsEmails, 'show');
        contactsSecondaryHdr.innerHTML = 'Phone';
        break;
      default:
        addClass(contactsEmails, 'show');
        removeClass(contactsPhones, 'show');
        contactsSecondaryHdr.innerHTML = 'Email';
    }
  });

  // class functions
  function addClass(elems, className) {
    elems.forEach(function(elem) {
      var classes = elem.className.split(' ');
      if (!hasClass(classes, className)) {
        classes.push(className);
        elem.className = classes.join(' ');
      }
    });
  }

  function removeClass(elems, className) {
    elems.forEach(function(elem) {
      var classes = elem.className.split(' ');
      if (hasClass(classes, className)) {
        classes.pop(className);
        elem.className = classes.join(' ');
      }
    });
  }

  function hasClass(classes, className) {
    if (classes.indexOf(className) >= 0) {
      return true;
    }
    return false;
  }

}());
