<?php
require_once __DIR__ . '/blog_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    blog_json(['error' => 'Method not allowed'], 405);
}

header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');

function default_team_seed_rows() {
    return [
        ['name' => 'Sumair Fraz', 'role' => 'CRM Specialist', 'bio' => 'CRM specialist focused on customer relationship management and business process optimization. Expert in streamlining customer workflows and improving business efficiency.', 'avatar' => 'SF', 'skills' => ['CRM Systems', 'Business Process', 'Customer Management', 'Data Analysis', 'Workflow Optimization'], 'email' => 'sumair@bestechvision.com'],
        ['name' => 'Asif Saeed', 'role' => 'CRM Specialist', 'bio' => 'CRM specialist with expertise in customer data management and sales automation systems. Dedicated to improving customer experience through technology.', 'avatar' => 'AS', 'skills' => ['Customer Data', 'Sales Automation', 'CRM Development', 'Process Improvement', 'System Integration'], 'email' => 'asif@bestechvision.com'],
        ['name' => 'Salar Kamran', 'role' => 'Social Media Manager', 'bio' => 'Social media manager responsible for digital marketing and brand presence across platforms. Creative strategist focused on engaging content and community building.', 'avatar' => 'SK', 'skills' => ['Social Media', 'Digital Marketing', 'Content Strategy', 'Brand Management', 'Community Engagement'], 'email' => 'salar@bestechvision.com'],
        ['name' => 'Hafiz Mubsher', 'role' => 'App Developer', 'bio' => 'Mobile app developer specializing in cross-platform applications and user experience design. Passionate about creating intuitive and engaging mobile experiences.', 'avatar' => 'HM', 'skills' => ['Mobile Development', 'Cross-Platform', 'User Experience', 'App Design', 'Performance Optimization'], 'email' => 'hafiz@bestechvision.com'],
        ['name' => 'Abdul Rafay', 'role' => 'Full Stack Developer', 'bio' => 'Full stack developer with expertise in both frontend and backend technologies. Committed to building robust and scalable web applications.', 'avatar' => 'AR', 'skills' => ['Full Stack', 'Web Development', 'Database Design', 'API Development', 'System Architecture'], 'email' => 'abdul@bestechvision.com'],
        ['name' => 'Aqib Saeed', 'role' => 'Social Media', 'bio' => 'Social media specialist focused on content creation and community engagement. Expert in building brand awareness and driving user engagement.', 'avatar' => 'AQ', 'skills' => ['Content Creation', 'Social Media', 'Community Management', 'Digital Strategy', 'Brand Awareness'], 'email' => 'aqib@bestechvision.com'],
        ['name' => 'Hasan Suhail', 'role' => 'CRM Developer', 'bio' => 'CRM developer specializing in custom CRM solutions and database integration. Focused on creating tailored solutions for business needs.', 'avatar' => 'HS', 'skills' => ['CRM Development', 'Database Integration', 'Custom Solutions', 'Business Logic', 'System Customization'], 'email' => 'hasan@bestechvision.com'],
        ['name' => 'Ahmed Niaz', 'role' => 'Software Engineer', 'bio' => 'Software engineer with expertise in system development and technical problem solving. Dedicated to writing clean, efficient code and solving complex challenges.', 'avatar' => 'AN', 'skills' => ['Software Development', 'Problem Solving', 'Code Architecture', 'System Design', 'Technical Analysis'], 'email' => 'ahmed@bestechvision.com'],
        ['name' => 'Humayun Shahid', 'role' => 'Business Executive', 'bio' => 'Business executive responsible for strategic planning and client relationship management. Focused on driving business growth and maintaining strong client partnerships.', 'avatar' => 'HS', 'skills' => ['Strategic Planning', 'Client Relations', 'Business Development', 'Project Management', 'Team Leadership'], 'email' => 'humayun@bestechvision.com'],
        // ['name' => 'Arslan', 'role' => 'Software Engineer', 'bio' => 'Software engineer focused on building reliable and scalable web solutions. Works across frontend and backend features to deliver high-quality products.', 'avatar' => 'AR', 'skills' => ['Web Development', 'API Integration', 'Problem Solving', 'Code Quality', 'System Design'], 'email' => 'arslan@bestechvision.com'],
        ['name' => 'M Hamza', 'role' => 'Developer', 'bio' => 'Developer contributing to modern web application development and feature delivery. Focused on clean implementation and efficient collaboration.', 'avatar' => 'MH', 'skills' => ['Frontend Development', 'React', 'UI Implementation', 'Debugging', 'Team Collaboration'], 'email' => 'hamza@bestechvision.com'],
        ['name' => 'Mutahir-ul-haq', 'role' => 'Team Member', 'bio' => 'Team member supporting project execution and daily technical operations. Helps ensure smooth delivery and consistent quality.', 'avatar' => 'MU', 'skills' => ['Project Support', 'Technical Assistance', 'Quality Checks', 'Documentation', 'Coordination'], 'email' => 'mutahir@bestechvision.com'],
        ['name' => 'Osama Razzaq', 'role' => 'Team Member', 'bio' => 'Team member helping deliver client-focused solutions across ongoing projects. Contributes to planning, implementation, and follow-through.', 'avatar' => 'OR', 'skills' => ['Client Support', 'Execution', 'Teamwork', 'Delivery', 'Communication'], 'email' => 'osama@bestechvision.com']
    ];
}

function seed_missing_default_team(PDO $pdo) {
    $exists = $pdo->prepare('SELECT id FROM team_members WHERE name = :name LIMIT 1');
    $insert = $pdo->prepare(
        'INSERT INTO team_members
            (name, role, bio, avatar, image_path, skills_json, linkedin, twitter, github, email, sort_order)
         VALUES
            (:name, :role, :bio, :avatar, :image_path, :skills_json, :linkedin, :twitter, :github, :email, :sort_order)'
    );

    $sortOrder = (int)$pdo->query('SELECT COALESCE(MAX(sort_order), 0) FROM team_members')->fetchColumn() + 1;
    foreach (default_team_seed_rows() as $member) {
        $exists->execute(['name' => $member['name']]);
        if ($exists->fetch()) {
            continue;
        }

        $insert->execute([
            'name' => $member['name'],
            'role' => $member['role'],
            'bio' => $member['bio'],
            'avatar' => $member['avatar'],
            'image_path' => null,
            'skills_json' => json_encode($member['skills']),
            'linkedin' => '#',
            'twitter' => '#',
            'github' => '#',
            'email' => $member['email'],
            'sort_order' => $sortOrder
        ]);
        $sortOrder++;
    }
}

try {
    $pdo = blog_pdo();
    seed_missing_default_team($pdo);
    $stmt = $pdo->query(
        'SELECT id, name, role, bio, avatar, image_path, skills_json, linkedin, twitter, github, email
         FROM team_members
         ORDER BY sort_order ASC, id ASC'
    );
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $out = [];
    foreach ($rows as $row) {
        $skills = [];
        if (!empty($row['skills_json'])) {
            $decoded = is_string($row['skills_json'])
                ? json_decode($row['skills_json'], true)
                : $row['skills_json'];
            $skills = is_array($decoded) ? $decoded : [];
        }
        $img = $row['image_path'] ? cms_public_upload_url($row['image_path']) : '';
        $out[] = [
            'id' => (int)$row['id'],
            'name' => $row['name'],
            'role' => $row['role'],
            'bio' => $row['bio'],
            'avatar' => $row['avatar'] ?: '',
            'image' => $img,
            'skills' => $skills,
            'social' => [
                'linkedin' => $row['linkedin'] ?: '#',
                'twitter' => $row['twitter'] ?: '#',
                'github' => $row['github'] ?: '#',
                'email' => $row['email'] ?: ''
            ]
        ];
    }
    blog_json($out);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
