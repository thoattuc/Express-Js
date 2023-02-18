create DATABASE staff_management;

use `staff_management`;

CREATE TABLE staffs (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  position ENUM('manager', 'staff') NOT NULL,
  path VARCHAR(255)
);

SELECT * FROM staffs;