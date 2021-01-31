# Svelte To Do

- To do list
    - [x] Create new items
    - [x] Mark an item as completed
    - [x] Edit item
      - [x] enter edit mode
      - [x] exit edit mode
      - [x] test if the item text is changing on blur
    - [x] Delete items
      - [x] Fire delete event from Item
      - [x] add delete button
      - [x] handle event on App
  
    - [x] Active Item counter
      - [x] Create counter
      - [x] hide counter for items == 0
      - [x] update counter on item checked
        - [x] refactor the binds to use events instead
          - [x] done
          - [x] text
  
    - [x] Filter items by status
      - [x] new filter (radio buttons)
        - [x] all
        - [x] complete
        - [x] done
      - [x] filter items by status

    - [x] fix items behavior after filtering.
      - [x] the items are not properly showing the "done" state in the checkbox after we change the filters.

    - [ ] refactor filter functionality.
      - [ ] use the radio button values to set the filter to be used
      - [ ] validate the filter name before setting ?

    - [ ] Refactor app to use the store ?
    - [ ] Use lifecycle hooks to load the initial state of the item?

    - [ ] Clear completed items
    - [x] refactor todo item to fire events instead of using binds?

FOR NEXT SESSION:
