export const SCROLL_OFFSET_MEDIA_QUERY = '(min-width: 760px)';
export const DEFAULT_SCROLL_OFFSET = 10;
export const SCROLL_OFFSET_ON_MATCHING_MEDIA_QUERY = 175;

export const scrollTo = (id: string, behavior: ScrollBehavior = 'smooth') => {
  const element = document.getElementById(id);

  if (!element) return;

  const { matches } = window.matchMedia(SCROLL_OFFSET_MEDIA_QUERY);
  const offset = matches
    ? DEFAULT_SCROLL_OFFSET
    : SCROLL_OFFSET_ON_MATCHING_MEDIA_QUERY;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior
  });
};
