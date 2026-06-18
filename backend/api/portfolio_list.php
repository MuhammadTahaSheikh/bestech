<?php
require_once __DIR__ . '/blog_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    blog_json(['error' => 'Method not allowed'], 405);
}

function default_portfolio_seed_rows() {
    return [
        [
            'title' => 'Stop ShopREI - Real Estate Lead Generation Platform',
            'category' => 'realestate',
            'category_label' => 'Real Estate Web Development',
            'description' => 'A comprehensive lead generation platform for real estate investors, featuring appointment booking, lead management, and ROI tracking with guaranteed results.',
            'icon_key' => 'users',
            'technologies' => ['React', 'Node.js', 'MongoDB', 'Stripe', 'Calendly API', 'Email Marketing'],
            'duration' => '6 months',
            'team_size' => '5 developers',
            'features' => [
                'Advanced appointment booking system with Calendly integration',
                'Lead qualification and management dashboard',
                'ROI tracking and analytics',
                'Automated email and SMS campaigns',
                'Payment processing with Stripe',
                'Responsive design for all devices'
            ],
            'live_url' => 'https://stopshoprei.com/',
            'github_url' => '#'
        ],
        [
            'title' => 'Bobby & Afton Real Estate Group Website',
            'category' => 'realestate',
            'category_label' => 'Real Estate Web Development',
            'description' => 'Professional real estate website for Bobby & Afton Peterson Real Estate Group, featuring property listings, team profiles, and client testimonials.',
            'icon_key' => 'code',
            'technologies' => ['React', 'Styled Components', 'Framer Motion', 'Responsive Design'],
            'duration' => '3 months',
            'team_size' => '3 developers',
            'features' => [
                'Modern, responsive design with smooth animations',
                'Team member profiles and testimonials',
                'Property search and filtering',
                'Contact forms and lead capture',
                'SEO optimized for local search',
                'Mobile-first approach'
            ],
            'live_url' => 'https://www.bobbyandafton.com/',
            'github_url' => '#'
        ],
        [
            'title' => 'Stupid Cheap Houses - Investment Property Platform',
            'category' => 'realestate',
            'category_label' => 'Real Estate Web Development',
            'description' => 'Investment property listing platform for real estate investors, featuring off-market properties, lead capture forms, and investor-focused design.',
            'icon_key' => 'rocket',
            'technologies' => ['React', 'Node.js', 'PostgreSQL', 'Email Marketing', 'Lead Capture'],
            'duration' => '4 months',
            'team_size' => '4 developers',
            'features' => [
                'Property listing management system',
                'Advanced lead capture forms',
                'Email marketing integration',
                'Investor-focused user experience',
                'Property search and filtering',
                'Mobile responsive design'
            ],
            'live_url' => 'https://www.stupidcheaphouses.com/',
            'github_url' => '#'
        ],
        [
            'title' => 'AutoRei Chrome Extension - Real Estate Dashboard',
            'category' => 'extension',
            'category_label' => 'Chrome Extension Development',
            'description' => 'Comprehensive Chrome extension for real estate professionals, featuring lead management, appointment tracking, and business analytics dashboard.',
            'icon_key' => 'rocket',
            'technologies' => ['Chrome Extension API', 'JavaScript', 'HTML/CSS', 'Chrome Storage', 'REST APIs'],
            'duration' => '5 months',
            'team_size' => '3 developers',
            'features' => [
                'Lead temperature tracking (Hot, Warm, Cold)',
                'Appointment management and scheduling',
                'SMS and call tracking analytics',
                'Marketing campaign success metrics',
                'Real-time dashboard updates',
                'Integration with real estate platforms'
            ],
            'live_url' => 'https://drive.google.com/file/u/0/d/1mR2xGoPckYn91hHxxruw-qwkDR9lIfdQ/view?usp=drive_link&pli=1',
            'github_url' => '#'
        ],
        [
            'title' => 'RPA Solutions - Robotic Process Automation Platform',
            'category' => 'automation',
            'category_label' => 'RPA/AI Development',
            'description' => 'Advanced Robotic Process Automation platform specializing in AI-powered solutions for business process optimization and automation.',
            'icon_key' => 'cloud',
            'technologies' => ['Python', 'AI/ML', 'Automation Tools', 'Cloud Computing', 'Process Mining'],
            'duration' => '8 months',
            'team_size' => '6 developers',
            'features' => [
                'AI-powered process automation',
                'Machine learning model integration',
                'Cloud-based deployment',
                'Process optimization algorithms',
                'Real-time monitoring and analytics',
                'Scalable automation solutions'
            ],
            'live_url' => 'https://roboticprocessautomation.us/',
            'github_url' => '#'
        ],
        [
            'title' => 'Seven Pines Investment Platform',
            'category' => 'web',
            'category_label' => 'Web Development',
            'description' => 'Investment management platform for Seven Pines, featuring portfolio management, investment tracking, and client dashboard.',
            'icon_key' => 'code',
            'technologies' => ['React', 'Node.js', 'Financial APIs', 'Data Visualization', 'Security'],
            'duration' => '4 months',
            'team_size' => '4 developers',
            'features' => [
                'Portfolio management dashboard',
                'Investment tracking and analytics',
                'Client portal and reporting',
                'Financial data integration',
                'Secure authentication system',
                'Real-time market data updates'
            ],
            'live_url' => 'https://sevenpinesinvest.com/',
            'github_url' => '#'
        ]
    ];
}

function seed_missing_default_portfolio(PDO $pdo) {
    $exists = $pdo->prepare('SELECT id FROM portfolio_projects WHERE title = :title LIMIT 1');
    $insert = $pdo->prepare(
        'INSERT INTO portfolio_projects
            (title, category, category_label, description, icon_key, technologies_json, duration, team_size, features_json, live_url, github_url, sort_order)
         VALUES
            (:title, :category, :category_label, :description, :icon_key, :technologies_json, :duration, :team_size, :features_json, :live_url, :github_url, :sort_order)'
    );

    $sortOrder = (int)$pdo->query('SELECT COALESCE(MAX(sort_order), 0) FROM portfolio_projects')->fetchColumn() + 1;
    foreach (default_portfolio_seed_rows() as $project) {
        $exists->execute(['title' => $project['title']]);
        if ($exists->fetch()) {
            continue;
        }

        $insert->execute([
            'title' => $project['title'],
            'category' => $project['category'],
            'category_label' => $project['category_label'],
            'description' => $project['description'],
            'icon_key' => $project['icon_key'],
            'technologies_json' => json_encode($project['technologies']),
            'duration' => $project['duration'],
            'team_size' => $project['team_size'],
            'features_json' => json_encode($project['features']),
            'live_url' => $project['live_url'],
            'github_url' => $project['github_url'],
            'sort_order' => $sortOrder
        ]);
        $sortOrder++;
    }
}

try {
    $pdo = blog_pdo();
    seed_missing_default_portfolio($pdo);
    $stmt = $pdo->query(
        'SELECT id, title, category, category_label, description, icon_key, technologies_json,
                duration, team_size, features_json, live_url, github_url
         FROM portfolio_projects
         ORDER BY sort_order ASC, id ASC'
    );
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $out = [];
    foreach ($rows as $row) {
        $tech = [];
        if (!empty($row['technologies_json'])) {
            $d = is_string($row['technologies_json'])
                ? json_decode($row['technologies_json'], true)
                : $row['technologies_json'];
            $tech = is_array($d) ? $d : [];
        }
        $features = [];
        if (!empty($row['features_json'])) {
            $d = is_string($row['features_json'])
                ? json_decode($row['features_json'], true)
                : $row['features_json'];
            $features = is_array($d) ? $d : [];
        }
        $out[] = [
            'id' => (int)$row['id'],
            'title' => $row['title'],
            'category' => $row['category'],
            'categoryLabel' => $row['category_label'],
            'description' => $row['description'],
            'iconKey' => $row['icon_key'] ?: 'code',
            'technologies' => $tech,
            'duration' => $row['duration'],
            'team' => $row['team_size'],
            'features' => $features,
            'liveUrl' => $row['live_url'] ?: '#',
            'githubUrl' => $row['github_url'] ?: '#'
        ];
    }
    blog_json($out);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
