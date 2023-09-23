export const parseStyles = (stylesString: string) => {
  const stylesArray = stylesString?.split(" ");

  const stylesObject: { [key: string]: string | boolean | number } = {};

  stylesArray?.forEach((style) => {
    if (style.includes("-")) {
      const [key, value] = style.split("-");
      stylesObject[key] = value;
    } else {
      stylesObject[style] = true;
    }
  });

  return stylesObject;
};

export const mergeStyles = (currentStyles: string, newStyles: string) => {
  const outputStyles = new Set<string>();
  const newStylesObject = parseStyles(newStyles);

  const mergedStyles = { ...parseStyles(currentStyles) };

  Object.keys(newStylesObject).forEach((key) => {
    mergedStyles[key] = newStylesObject[key];
  });

  for (const key in mergedStyles) {
    if (!mergedStyles.hasOwnProperty(key)) return;

    const value = mergedStyles[key];

    if (value === true) {
      outputStyles.add(key);
    } else {
      outputStyles.add(`${key}-${value}`);
    }
  }

  return [...outputStyles].join(" ");
};
