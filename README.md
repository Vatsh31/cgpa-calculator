# CGPA Calculator

A modern, responsive CGPA (Cumulative Grade Point Average) calculator built with React, Vite, and Tailwind CSS. Calculate your semester GPA and cumulative CGPA with ease, supporting both quick and detailed input modes.

## ✨ Features

- **Dual Input Modes**:
  - **Quick Mode**: Enter total semester credits and credit points directly from your grade card
  - **Detailed Mode**: Add individual subjects with credits and grade points for automatic calculation

- **Smart Calculations**:
  - Automatic SGPA (Semester Grade Point Average) calculation
  - Running CGPA calculation across all semesters
  - Percentage conversion using standard formulas
  - Real-time preview of calculations

- **Export & Data Management**:
  - Export results as CSV file
  - Copy results as JSON
  - Load sample data for testing
  - Clear all data functionality

- **Modern UI/UX**:
  - Responsive design that works on desktop and mobile
  - Clean, intuitive interface with Tailwind CSS
  - Interactive form validation
  - Helpful tooltips and instructions

## 🚀 Live Demo

[Deploy to Vercel](https://cgpa-calculator-sakec.vercel.app/) to get your own live instance.

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.0
- **Styling**: Tailwind CSS 3.4.17
- **Deployment**: Vercel (ready to deploy)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vatsh31/cgpa-calculator.git
   cd cgpa-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📖 How to Use

### Quick Mode (Recommended for most users)
1. Click "Add Quick Semester"
2. Enter the semester name (e.g., "Semester 3")
3. Input total semester credits from your grade card
4. Input total semester credit points from your grade card
5. The calculator will automatically compute SGPA and update CGPA

### Detailed Mode (For subject-wise calculation)
1. Click "Add Detailed Semester"
2. Add subjects one by one with:
   - Subject name
   - Credits (e.g., 3, 4, 2)
   - Grade points (e.g., 10 for O, 9 for A+, 8 for A, etc.)
3. The calculator automatically computes credit points and SGPA

### Grade Point Reference
- O (Outstanding): 10 points
- A+ (Excellent): 9 points
- A (Very Good): 8 points
- B+ (Good): 7 points
- B (Above Average): 6 points
- C (Average): 5 points
- P (Pass): 4 points
- F (Fail): 0 points

### Percentage Conversion
The calculator uses standard conversion formulas:
- If CGPA ≥ 7: Percentage = 7.4 × CGPA + 12
- If CGPA < 7: Percentage = 7.1 × CGPA + 12

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Deploy with default settings

The project includes a `vercel.json` configuration for optimal deployment.

### Alternative Deployment Options

- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions or deploy from `dist/` folder
- **Any static hosting**: Upload the contents of `dist/` folder

## 📁 Project Structure

```
cgpa-calculator/
├── src/
│   ├── App.jsx          # Main CGPA calculator component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS imports
├── public/
│   └── vite.svg         # Vite logo
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vercel.json          # Vercel deployment config
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🎯 Key Features Explained

### Semester Management
- Add unlimited semesters
- Switch between Quick and Detailed modes
- Remove semesters (minimum 1 semester required)
- Rename semesters for better organization

### Real-time Calculations
- SGPA calculation per semester
- Cumulative CGPA across all semesters
- Automatic percentage conversion
- Live preview of all calculations

### Data Export
- **CSV Export**: Download results as spreadsheet
- **JSON Copy**: Copy results to clipboard for backup
- **Sample Data**: Load example data to test functionality

## 🔧 Customization

### Modify Grade Point System
Edit the grade point values in the detailed mode inputs to match your institution's grading system.

### Change Percentage Formula
Modify the conversion formula in `src/App.jsx` line 77:
```javascript
const percentage = cgpa >= 7 ? (7.4 * cgpa + 12) : (7.1 * cgpa + 12);
```

### Styling
The app uses Tailwind CSS. Modify `tailwind.config.js` to customize colors, fonts, and other design elements.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure all dependencies are installed correctly
3. Verify your grade point system matches the calculator's expectations
4. Open an issue on GitHub with detailed information

## 🎓 Academic Use

This calculator is designed for educational purposes and follows standard academic grading practices. Always verify calculations with your institution's official grading system.

---

**Built with ❤️ using React, Vite, and Tailwind CSS** 
