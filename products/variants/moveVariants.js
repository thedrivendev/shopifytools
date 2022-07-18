const xlsx = require('xlsx');
const camelCase = require('../../utils/camelCase');

(async file => {
  // Require file
  if (!file) {
    console.error('\n\tError: file must be provided as CLI argument\n');
    process.exit();
  }

  // Parse workbook
  const workbook = xlsx.readFile(file);
  const data = xlsx.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  // Validate required columns
  const requiredKeys = ['Product ID', 'Variant ID', 'New Product ID'];
  const [isValid] = data.map(row =>
    requiredKeys.map(reqKey => Object.keys(row).includes(reqKey)).every(Boolean)
  );
  if (!isValid) {
    console.error(
      `\n\tError: file must include the following keys: ${requiredKeys.join(
        ', '
      )}\n`
    );
    process.exit();
  }
  console.log(data[0]);

  const rows = data.map(row =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [camelCase(key), value])
    )
  );

  console.log(rows[0]);

  console.log(camelCase('Test String'));
})(process.argv[2]);
