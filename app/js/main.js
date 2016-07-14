  /* FILTER TAGS HANDLING
  // ========================================================================== */

  function filterTags() {

      /* ADD/REMOVE TAG WHEN CLICKING ON FILTER */
      $('#filter__tags__generate input:checkbox').on('click', function() {
          var checkboxId = $(this).attr('id');
          if ($(this).is(':checked')) {
              var checkboxText = $('label[for="' + this.id + '"]').text();
              var tagButton = '<li class="tags__list__item"><button class="tags__list__button" data-checkbox=' + checkboxId + '><i class="ws ws--delete" aria-hidden="true"></i>' + checkboxText + '</button></li>';
              $('#filter__tags__remove').before(tagButton);
          } else {
              $('#filter__tags__stack').find('[data-checkbox="' + checkboxId + '"]').parent('li').remove();
          }
      });

      /* REMOVE TAG AND UNCKECKING FILTER WHEN CLICKING ON TAG */
      $('#filter__tags__stack').on('click', '.tags__list__button', function(e) {
          var buttonCheckbox = '#' + $(this).attr('data-checkbox');
          $(buttonCheckbox).prop('checked', false);
          $(this).parent('li').remove();
      });

      /* REMOVE TAGS AND UNCKECKING FILTERS WHEN CLICKING ON "CLEAR SELECTION" */
      $('#filter__tags__remove').on('click', function(e) {
          e.preventDefault();
          $(this).prevAll().remove();
          $('#filter__tags__generate input:checkbox').prop('checked', false);
      });
  }


  /* CHECK/UNCHECK USERS IN TABLE
  // ========================================================================== */

  function checkTableUsers() {

      /* TABLE BODY CHECKBOXES */
      $('.table__users tbody input[name=user]').click(function() {

          /* Check/uncheck header checkbox if all/no table body checkboxes are selected and toggle table footer dropdowns */
          var allCheckboxes = $('.table__users tbody input[name=user]');
          var selectedCheckboxes = allCheckboxes.filter(":checked");
          if ($(selectedCheckboxes).length == $(allCheckboxes).length) {
              $('#checkbox__user_all').prop('checked', true);
          } else if ($(selectedCheckboxes).length > 0 && $(selectedCheckboxes).length < $(allCheckboxes).length) {
              $('#table__footer__actions').removeClass('hidden');
              $('#checkbox__user_all').prop('checked', false);
          } else if ($(selectedCheckboxes).length === 0) {
              $('#table__footer__actions').addClass('hidden');
          }

          /* Toggle-select current row */
          $(this).closest('tr').toggleClass('tr--selected');
      });

      /* TABLE HEADER CHECKBOX: toggle-select rows and toggle footer dropdowns */
      $('#checkbox__user_all').click(function() {
          var status = $(this).is(':checked');
          $('.table__users tbody input[name=user]').prop('checked', status);
          if (status) {
              $('#table__footer__actions').removeClass('hidden');
              $('.table__users tbody tr').addClass('tr--selected');
          } else {
              $('#table__footer__actions').addClass('hidden');
              $('.table__users tbody tr').removeClass('tr--selected');
          }
      });
  }


  /* ENABLE FILTERS IN ADVANCED SEARCH
  // ========================================================================== */
  function advancedSearchEnabling() {
      $('.form__group').each(function() {
          $(this).on('change', '[data-trigger="filter"]:enabled', function() {
              var activate = "#" + $(this).attr('aria-controls');
              if ($(this).val()) {
                  $(activate).attr('class', this.className.replace(/--disabled/, '--default')).removeAttr('disabled');
                  if ($(this).is("#filter__usergroup__01")) {
                      $("select[multiple]").multipleSelect("enable");
                  }
              }
          });
      });
  }

  /* START DOCUMENT READY
  // ========================================================================== */
  $(document).ready(function() {

      filterTags();
      advancedSearchEnabling();
      checkTableUsers();


      /* CALENDAR PLUGIN
      // ========================================================================== */
      $('.input__box--timepicker').pickmeup({
          position: 'bottom',
          first_day: 0,
          hide_on_select: true
      });

      /* MULTI SELECT
      // ========================================================================== */
      $('select[multiple]').multipleSelect({
          placeholder: "Select one or more options"
      });

      /* END DOCUMENT READY
      // ========================================================================== */
  });
