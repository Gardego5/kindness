-- Up

INSERT INTO projects (name, start_date) VALUES
  ('Barbara Lloyd', '2022-08-01'),
  ('Other Project', '2022-10-01');

INSERT INTO users (username, email, hash, salt, first_name, last_name, is_admin) VALUES
  ( -- Password: 'password'
    'Gardego5',
    'garrett.davis.7777@gmail.com',
    '1d55db99e6b3015ff3c154c29af5d8c2ee9ad4ec5b0db07025ece9b3ff62385d6fcb664718306ad43216188dffab5e5ac7105b6732a9248b435b430d1b3698ea',
    '6824d81266c97c87a6dbd2cd5b7c4453',
    'Garrett',
    'Davis',
    TRUE
  ),
  ( -- Password: 'Password'
    'Lightyear',
    'phasermike@gmail.com',
    '5686ab4d3b135502ab5abf7968b303bff8e2ea9160ff7ea05f79234265663e701cd3390702d52c69b8445b25d6c7a98c85225563dc23e0db78325703919fd74f',
    'aabff97d24f8f7db5841bb5072628a96',
    'Phaser',
    'Mike',
    FALSE
  );

INSERT INTO users_projects (user_id, project_id) VALUES
  (1, 1),
  (2, 1),
  (1, 2);

INSERT INTO timeslots (title, project_id) VALUES
  ('morning', 1),
  ('afternoon', 1),
  ('evening', 1),
  ('morning', 2),
  ('evening', 2);

INSERT INTO visits (date, timeslot_id, project_id) VALUES
  ('2022-11-26', 2, 1),
  ('2022-11-27', 2, 1),
  ('2022-11-30', 4, 2);

INSERT INTO users_visits (user_id, visit_id) VALUES
  (1, 1),
  (2, 1),
  (2, 2);

INSERT INTO groups (id, name, hash, salt) VALUES
  ( -- Password: 'random_password'
    'c43ba1b1-9bca-4b19-bf22-70677523b1d6',
    'test_group',
    'dd2790b68120b462b60f68e4ac6588e05d994020331fae50a0554035ba75465da52da4063b9ea5196708f4e355734896871e40cd82f3a55e5558a1a2613deda5',
    'fbb31b29b1f77fe07a8eada99a9deb28'
  );

INSERT INTO groups_projects (group_id, project_id) VALUES
  ('c43ba1b1-9bca-4b19-bf22-70677523b1d6', 1);

-- Down
