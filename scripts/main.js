document.getElementById('year').textContent = new Date().getFullYear();

const startReservationBtn = document.getElementById('start-reservation');
if (startReservationBtn) {
  startReservationBtn.addEventListener('click', function () {
    window.location.href = '2.html';
  });
}

const reserveBtns = document.querySelectorAll('.gh-btn-table');
if (reserveBtns.length > 0) {
  reserveBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // For now, show a mock alert. Replace with navigation to 3.html as needed.
      //alert('Reservation started for this date! (Connect to next step)');
      // window.location.href = '3.html';
    });
  });
}

const editBtn = document.querySelector('.reserve-visit');
if (editBtn) {
  editBtn.addEventListener('click', function () {
    // For now, show a mock alert. Replace with navigation to 4.html as needed.
    //// alert('Continue/Edit reservation (Connect to next step)');
    window.location.href = '4.html';
  });
}

const continueReservationBtn = document.getElementById('continue-reservation');
if (continueReservationBtn) {
  continueReservationBtn.addEventListener('click', function () {
    window.location.href = '3.html';
  });
}

const reserveLaterBtn = document.getElementById('reserve-later');
if (reserveLaterBtn) {
  reserveLaterBtn.addEventListener('click', function () {
    //alert('Reservation saved for later! (Connect to save logic)');
    // window.location.href = 'index.html';
  });
}

const reserveAccountBtn = document.getElementById('reserve-account');
if (reserveAccountBtn) {
  reserveAccountBtn.addEventListener('click', function () {
    window.location.href = '5.html';
  });
}

const backLink = document.getElementById('back-link');
if (backLink) {
  backLink.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '2.html';
  });
}

const saveLaterBtn = document.getElementById('save-later');
if (saveLaterBtn) {
  saveLaterBtn.addEventListener('click', function () {
    //alert('Progress saved for later! (Connect to save logic)');
    // window.location.href = 'index.html';
  });
}

const saveAddAttendeeBtn = document.getElementById('save-add-attendee');
if (saveAddAttendeeBtn) {
  saveAddAttendeeBtn.addEventListener('click', function () {
    window.location.href = '6.html';
  });
}

const saveAddRepBtn = document.getElementById('save-add-rep');
if (saveAddRepBtn) {
  saveAddRepBtn.addEventListener('click', function () {
    window.location.href = '7.html';
  });
}

const createAccountLink = document.getElementById('create-account-link');
if (createAccountLink) {
  createAccountLink.addEventListener('click', function (e) {
    e.preventDefault();
    //alert('Create customer account (Connect to account creation flow)');
  });
}

// Back link for 5.html
if (window.location.pathname.endsWith('5.html')) {
  const backLink = document.getElementById('back-link');
  if (backLink) {
    backLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = '4.html';
    });
  }
}

// Custom Select Dropdown (Reusable)
document.querySelectorAll('.gh-custom-select').forEach(function (customSelect) {
  const trigger = customSelect.querySelector('.gh-select-trigger');
  const options = customSelect.querySelector('.gh-select-options');
  const valueSpan = customSelect.querySelector('.gh-select-value');
  const isMulti = customSelect.hasAttribute('data-multiselect');
  let isOpen = false;
  let selectedValues = [];

  function openDropdown() {
    customSelect.setAttribute('aria-expanded', 'true');
    options.hidden = false;
    isOpen = true;
  }
  function closeDropdown() {
    customSelect.setAttribute('aria-expanded', 'false');
    options.hidden = true;
    isOpen = false;
  }

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  if (isMulti) {
    // Multi-select logic
    function updateRepNoneLogic(customSelect, options) {
      const isRepDropdown = customSelect.id === 'rep-attendee-names-select';
      if (!isRepDropdown) return;
      const allCheckboxes = options.querySelectorAll('.gh-checkbox');
      const noneCheckbox = options.querySelector('.gh-rep-none');
      const otherCheckboxes = Array.from(allCheckboxes).filter(
        (cb) => !cb.classList.contains('gh-rep-none')
      );
      if (noneCheckbox.checked) {
        otherCheckboxes.forEach((cb) => {
          cb.checked = false;
          cb.disabled = true;
        });
      } else if (otherCheckboxes.some((cb) => cb.checked)) {
        noneCheckbox.checked = false;
        noneCheckbox.disabled = true;
        otherCheckboxes.forEach((cb) => {
          cb.disabled = false;
        });
      } else {
        noneCheckbox.disabled = false;
        otherCheckboxes.forEach((cb) => {
          cb.disabled = false;
        });
      }
    }
    function renderSelectedRepAttendees(options) {
      const selectedList = document.querySelector('.gh-selected-list');
      const noneCheckbox = options.querySelector('.gh-rep-none');
      const checked = options.querySelectorAll('.gh-checkbox:checked');
      selectedList.innerHTML = '';
      if (noneCheckbox && noneCheckbox.checked) {
        const div = document.createElement('div');
        div.textContent = 'NONE - No rep(s) attending';
        selectedList.appendChild(div);
        return;
      }
      checked.forEach((cb) => {
        if (!cb.classList.contains('gh-rep-none')) {
          const label = cb.parentElement
            .querySelector('.gh-option-bold')
            .textContent.trim();
          const div = document.createElement('div');
          div.innerHTML = `${label}<br><span class="material-symbols-outlined text-14 flex-center"> add </span><span class="gh-add-details">Add Details (Optional)</span>`;
          selectedList.appendChild(div);
        }
      });
    }
    function renderSelectedAttendees(expandedIndex) {
      const selectedLabels = Array.from(
        options.querySelectorAll('.gh-checkbox:checked')
      ).map((cb) =>
        cb.parentElement.querySelector('.gh-option-bold').textContent.trim()
      );
      const selectedValuesArr = Array.from(
        options.querySelectorAll('.gh-checkbox:checked')
      ).map((cb) => cb.closest('.gh-select-option').getAttribute('data-value'));
      const selectedAttendeesList = document.getElementById(
        'selected-attendees-list'
      );
      if (selectedAttendeesList) {
        if (selectedLabels.length > 0) {
          selectedAttendeesList.innerHTML =
            `<div class=\"gh-selected-attendees-title\">Selected Attendees</div>` +
            selectedLabels
              .map((name, i) => {
                const isExpanded = expandedIndex === i;
                return `<div class=\"gh-selected-attendee\">
                <div class=\"gh-selected-attendee-name\">${name}</div>
                <button class=\"gh-add-details-link gh-additional-info-collapsed\" type=\"button\" tabindex=\"0\" aria-expanded=\"${isExpanded}\" aria-controls=\"attendee-details-form-${i}\">
                  <span class=\"material-symbols-outlined gh-add-icon gh-toggle-icon text-14\" aria-hidden=\"true\">${
                    isExpanded ? 'remove' : 'add'
                  }</span>
                 <span class=\"gh-additional-info-label\">Add Details (Optional)</span>
                </button>
                ${
                  isExpanded
                    ? `
                <form class=\"gh-details-form\" id=\"attendee-details-form-${i}\" autocomplete=\"off\">
                  <label class=\"gh-label\">Job Title</label>
                  <input type=\"text\" class=\"gh-input\" />
                  <label class=\"gh-label\">* Name on Badge (How Attendee name will appear on badge)</label>
                  <input type=\"text\" class=\"gh-input\" required />
                  <label class=\"gh-label\">Dietary Restrictions/Special Requirements <span class=\"gh-attendee-details-char-count\" id=\"dietary-count-${i}\">0/1200</span></label>
                  <textarea class=\"gh-textarea gh-attendee-details-textarea\" maxlength=\"1200\" id=\"dietary-textarea-${i}\"></textarea>
                  <label class=\"gh-label\">Comments <span class=\"gh-attendee-details-char-count\" id=\"comments-count-${i}\">0/1200</span></label>
                  <textarea class=\"gh-textarea gh-attendee-details-textarea\" maxlength=\"1200\" id=\"comments-textarea-${i}\" placeholder=\"e.g. I'm interested in...\"></textarea>
                  <div class='gh-flex-row'>
                    <div class='gh-label-group w-auto' role='radiogroup' aria-labelledby='prayer-time-label-${i}'>
                      <label class='gh-label' id='prayer-time-label-${i}' for='prayer-time-yes-${i}'><span>Prayer Time?</span></label>
                      <div class="gh-radio-label-yn-container">
                        <label class='gh-radio-label' for='prayer-time-yes-${i}'>
                          <input type='radio' id='prayer-time-yes-${i}' name='prayer-time-${i}' value='yes' class='gh-radio' aria-checked='false' aria-labelledby='prayer-time-label-${i} prayer-time-yes-label-${i}' />
                          <span class='gh-radio-label-text-yn' id='prayer-time-yes-label-${i}'>Yes</span>
                        </label>
                        <label class='gh-radio-label' for='prayer-time-no-${i}'>
                          <input type='radio' id='prayer-time-no-${i}' name='prayer-time-${i}' value='no' class='gh-radio' aria-checked='false' aria-labelledby='prayer-time-label-${i} prayer-time-no-label-${i}' />
                          <span class='gh-radio-label-text-yn' id='prayer-time-no-label-${i}'>No</span>
                        </label>
                      </div>
                    </div>
                    <div class="gh-label-group flex-1">
                      <label class='gh-label' for='prayer-time-input-${i}'><span>Enter prayer time</span></label>
                      <input type='text' id='prayer-time-input-${i}' class='gh-input' aria-label='Enter prayer time' />
                    </div>
                  </div>
                </form>
                `
                    : ''
                }
              </div>`;
              })
              .join('');
        } else {
          selectedAttendeesList.innerHTML = '';
        }
      }
      // Add event listeners for details toggles
      Array.from(document.querySelectorAll('.gh-add-details-link')).forEach(
        (btn, i) => {
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            // If already expanded, collapse; otherwise expand this and collapse others
            renderSelectedAttendees(isExpanded ? null : Number(i));
            addDetailsCharCountListeners(Number(i));
          });
          btn.addEventListener('keydown', function (e) {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              const isExpanded = btn.getAttribute('aria-expanded') === 'true';
              renderSelectedAttendees(isExpanded ? null : Number(i));
              addDetailsCharCountListeners(Number(i));
            }
          });
        }
      );
      // Add char count listeners if expanded
      if (typeof expandedIndex === 'number') {
        addDetailsCharCountListeners(expandedIndex);
      }
    }
    function addDetailsCharCountListeners(i) {
      const dietary = document.getElementById(`dietary-textarea-${i}`);
      const dietaryCount = document.getElementById(`dietary-count-${i}`);
      if (dietary && dietaryCount) {
        dietary.addEventListener('input', function () {
          dietaryCount.textContent = `${dietary.value.length}/1200`;
        });
      }
      const comments = document.getElementById(`comments-textarea-${i}`);
      const commentsCount = document.getElementById(`comments-count-${i}`);
      if (comments && commentsCount) {
        comments.addEventListener('input', function () {
          commentsCount.textContent = `${comments.value.length}/1200`;
        });
      }
    }
    let expandedAttendeeIndex = null;
    options.addEventListener('click', function (e) {
      const option = e.target.closest('.gh-select-option');
      if (option) {
        const checkbox = option.querySelector('.gh-checkbox');
        checkbox.checked = !checkbox.checked;
        updateRepNoneLogic(customSelect, options);
        // Update trigger text
        const selectedLabels = Array.from(
          options.querySelectorAll('.gh-checkbox:checked')
        ).map((cb) =>
          cb.parentElement.querySelector('.gh-option-bold').textContent.trim()
        );
        valueSpan.textContent =
          selectedLabels.length > 0
            ? selectedLabels.join(', ')
            : 'Select attendee name(s)';
        if (typeof renderSelectedAttendees === 'function') {
          expandedAttendeeIndex = null;
          renderSelectedAttendees(expandedAttendeeIndex);
        }
        renderSelectedRepAttendees(options);
        e.stopPropagation();
      }
    });
    // Initial state
    updateRepNoneLogic(customSelect, options);
    if (typeof renderSelectedAttendees === 'function') {
      renderSelectedAttendees(expandedAttendeeIndex);
    }
    renderSelectedRepAttendees(options);
  } else {
    // Single-select logic
    options.addEventListener('click', function (e) {
      const option = e.target.closest('.gh-select-option');
      if (option) {
        valueSpan.textContent = option.textContent.trim();
        options
          .querySelectorAll('.gh-select-option')
          .forEach((opt) => opt.removeAttribute('aria-selected'));
        option.setAttribute('aria-selected', 'true');
        closeDropdown();
      }
    });
  }

  // Keyboard navigation
  customSelect.addEventListener('keydown', function (e) {
    if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
      openDropdown();
      e.preventDefault();
    } else if (isOpen && e.key === 'Escape') {
      closeDropdown();
      e.preventDefault();
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!customSelect.contains(e.target)) {
      closeDropdown();
    }
  });
});

// Additional Info Toggle
document.querySelectorAll('.gh-additional-info-collapsed').forEach((toggle) => {
  const fields = toggle.nextElementSibling;
  const icon = toggle.querySelector('.gh-toggle-icon');

  function setExpanded(expanded) {
    toggle.setAttribute('aria-expanded', expanded);
    fields.hidden = !expanded;
    if (icon) {
      icon.textContent = expanded
        ? 'remove_circle_outline'
        : 'add_circle_outline';
    }
  }

  function toggleInfo() {
    if (toggle.getAttribute('aria-disabled') === 'true') return;
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!isExpanded);
  }

  setExpanded(false); // Initial state

  toggle.addEventListener('click', toggleInfo);
  toggle.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleInfo();
    }
  });
});

// Char count for project focus textarea
const projectFocus = document.getElementById('project-focus');
const focusCount = document.getElementById('focus-count');
if (projectFocus && focusCount) {
  projectFocus.addEventListener('input', function () {
    focusCount.textContent = `${projectFocus.value.length}/250`;
  });
}

const saveAddTravelBtn = document.getElementById('save-add-travel');
if (saveAddTravelBtn) {
  saveAddTravelBtn.addEventListener('click', function () {
    window.location.href = '8.html';
  });
}

const saveReviewSummaryBtn = document.getElementById('save-review-summary');
if (saveReviewSummaryBtn) {
  saveReviewSummaryBtn.addEventListener('click', function () {
    window.location.href = '9.html';
  });
}

function setupDrivingFieldsToggle() {
  const dateLabel = document.getElementById('driving-arrival-date-label');
  const timeLabel = document.getElementById('driving-arrival-time-label');
  const dateInput = document.getElementById('driving-arrival-date-input');
  const timeInput = document.getElementById('driving-arrival-time-input');
  const yesRadio = document.getElementById('driving-yes');
  const noRadio = document.getElementById('driving-no');
  if (
    !dateLabel ||
    !timeLabel ||
    !dateInput ||
    !timeInput ||
    !yesRadio ||
    !noRadio
  ) {
    return;
  }
  function setDrivingFields(enabled) {
    if (enabled) {
      dateLabel.style.color = '#303028';
      timeLabel.style.color = '#303028';
      dateInput.disabled = false;
      timeInput.disabled = false;
    } else {
      dateLabel.style.color = '#D6D6D6';
      timeLabel.style.color = '#D6D6D6';
      dateInput.disabled = true;
      timeInput.disabled = true;
    }
  }
  // Set default state
  setDrivingFields(false);
  yesRadio.addEventListener('change', function () {
    if (this.checked) {
      setDrivingFields(true);
    }
  });
  noRadio.addEventListener('change', function () {
    if (this.checked) {
      setDrivingFields(false);
    }
  });
}
// Run on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupDrivingFieldsToggle);
} else {
  setupDrivingFieldsToggle();
}
