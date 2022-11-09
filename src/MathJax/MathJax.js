const MathJax = require('react-mathjax')
const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`

module.exports = () => {
    return (
        <MathJax.Provider>
        </MathJax.Provider>
    );
}