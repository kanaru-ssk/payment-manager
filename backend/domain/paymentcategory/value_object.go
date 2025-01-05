package paymentcategory

type ColorName string

const (
	Slate   ColorName = "slate"
	Gray    ColorName = "gray"
	Zinc    ColorName = "zinc"
	Neutral ColorName = "neutral"
	Stone   ColorName = "stone"
	Red     ColorName = "red"
	Orange  ColorName = "orange"
	Amber   ColorName = "amber"
	Yellow  ColorName = "yellow"
	Lime    ColorName = "lime"
	Green   ColorName = "green"
	Emerald ColorName = "emerald"
	Teal    ColorName = "teal"
	Cyan    ColorName = "cyan"
	Sky     ColorName = "sky"
	Blue    ColorName = "blue"
	Indigo  ColorName = "indigo"
	Violet  ColorName = "violet"
	Purple  ColorName = "purple"
	Fuchsia ColorName = "fuchsia"
	Pink    ColorName = "pink"
	Rose    ColorName = "rose"
)

func (e ColorName) String() string {
	return string(e)
}

type ColorTone int

const (
	T50  ColorTone = 50
	T100 ColorTone = 100
	T200 ColorTone = 200
	T300 ColorTone = 300
	T400 ColorTone = 400
	T500 ColorTone = 500
	T600 ColorTone = 600
	T700 ColorTone = 700
	T800 ColorTone = 800
	T900 ColorTone = 900
	T950 ColorTone = 950
)
