<button class="close-button" on:click>
  <span class="close-button-content">
    <svg
      class="close-button-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
        fill="currentColor"
      />
    </svg>
  </span>
</button>

<style>
  .close-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: max-content;
    margin: 0;
    font-size: var(--cui-typography-body-s-font-size);
    font-weight: var(--cui-font-weight-bold);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border-width: var(--cui-border-width-kilo);
    transition:
      opacity var(--cui-transitions-default),
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default),
      border-color var(--cui-transitions-default);

    line-height: var(--cui-typography-body-m-line-height);

    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo))
      calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));

    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-normal);
    border-color: var(--cui-border-normal);

    border: none;
    border-radius: var(--cui-border-radius-byte);
  }

  .close-button:active .close-button-content {
    transform: translate(0, 1px);
  }

  .close-button:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-normal-hovered);
    border-color: var(--cui-border-normal-hovered);
  }

  .close-button:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-normal-pressed);
    border-color: var(--cui-border-normal-pressed);
  }

  .close-button:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .close-button:focus::-moz-focus-inner {
    border: 0;
  }

  .close-button:focus:not(:focus-visible) {
    box-shadow: none;
  }

  .close-button-content {
    display: flex;
    gap: var(--content-gap);
    place-content: center;
    align-items: center;
    min-width: 24px;
    min-height: 24px;
    opacity: 1;
    transition: opacity var(--cui-transitions-default);
  }

  .close-button-icon {
    width: var(--leading-icon-size);
    height: var(--leading-icon-size);
  }
</style>
