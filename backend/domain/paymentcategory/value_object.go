package paymentcategory

import (
	"regexp"
)

type ColorCode string

var colorCodeRegex = regexp.MustCompile(`^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$`)

func NewColorCode(colorCode string) (ColorCode, error) {
	if !isValidColorCodeFormat(colorCode) {
		return "", ErrInvalidColorCode
	}
	return ColorCode(colorCode), nil
}

func isValidColorCodeFormat(colorCode string) bool {
	return colorCodeRegex.MatchString(colorCode)
}

func (e ColorCode) String() string {
	return string(e)
}
