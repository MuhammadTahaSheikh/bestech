<?php
require_once __DIR__ . '/blog_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    blog_json(['error' => 'Method not allowed'], 405);
}

function default_portfolio_seed_rows() {
    return [
        [
            'title' => 'BestechVision AI CRM - AutoFollow',
            'category' => 'automation',
            'category_label' => 'RPA/AI Development',
            'description' => 'AI-powered CRM for lead management and automated follow-up, helping sales teams track prospects, nurture pipelines, and close deals faster.',
            'icon_key' => 'cloud',
            'technologies' => ['Next.js', 'AI/ML', 'CRM', 'Automation', 'REST APIs'],
            'duration' => '4 months',
            'team_size' => '4 developers',
            'features' => [
                'AI-driven lead scoring and follow-up',
                'Automated outreach and nurture sequences',
                'Real-time sales pipeline dashboard',
                'Lead activity tracking and analytics',
                'Team collaboration and role management',
                'Integration-ready API architecture'
            ],
            'live_url' => 'https://auto-follow-frontend.vercel.app/dashboard',
            'github_url' => 'https://github.com/MuhammadTahaSheikh/AutoFollow_frontend',
            'image_path' => '/portfolio/autofollow-crm.png'
        ],
        [
            'title' => 'BestechCare - Healthcare Platform',
            'category' => 'web',
            'category_label' => 'Healthcare Web Development',
            'description' => 'All-in-one healthcare platform for Pakistan — find top doctors and hospitals, book appointments, order lab tests, and get medicines delivered.',
            'icon_key' => 'mobile',
            'technologies' => ['React', 'Next.js', 'Healthcare APIs', 'Booking System', 'Search'],
            'duration' => '5 months',
            'team_size' => '5 developers',
            'features' => [
                'Doctor search by speciality and location',
                'In-clinic and video consultation booking',
                'Hospital finder with location-based results',
                'Lab test booking with discounts',
                'Prescription medicine ordering',
                'Doctor onboarding and practice growth tools'
            ],
            'live_url' => 'https://bestech-care.vercel.app/',
            'github_url' => 'https://github.com/MuhammadTahaSheikh/InstaCare_backend',
            'image_path' => '/portfolio/bestech-care.png'
        ],
        [
            'title' => 'Bestech Lawyer CMS',
            'category' => 'web',
            'category_label' => 'Legal Tech / CMS',
            'description' => 'Content management platform built for law firms, enabling case workflows, client management, and secure document handling in one centralized dashboard.',
            'icon_key' => 'shield',
            'technologies' => ['React', 'Firebase', 'CMS', 'Authentication', 'Responsive Design'],
            'duration' => '4 months',
            'team_size' => '4 developers',
            'features' => [
                'Law firm content and case management',
                'Secure client and document workflows',
                'Role-based admin dashboard',
                'Mobile-responsive interface',
                'Integrated authentication',
                'Scalable CMS architecture'
            ],
            'live_url' => 'https://lawyer-ai-eight.vercel.app/',
            'github_url' => 'https://github.com/MuhammadTahaSheikh/lawyer_ai',
            'image_path' => '/portfolio/lawyer-cms.png'
        ],
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
            'github_url' => '#',
            'image_path' => '/portfolio/stopshoprei.png'
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
            'github_url' => '#',
            'image_path' => '/portfolio/bobby-afton.png'
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
            'github_url' => '#',
            'image_path' => '/portfolio/stupid-cheap-houses.png'
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
            'github_url' => '#',
            'image_path' => '/portfolio/seven-pines.png'
        ]
    ];
}

function ensure_portfolio_image_column(PDO $pdo) {
    $cols = $pdo->query("SHOW COLUMNS FROM portfolio_projects LIKE 'image_path'")->fetchAll();
    if (empty($cols)) {
        $pdo->exec(
            'ALTER TABLE portfolio_projects ADD COLUMN image_path VARCHAR(512) DEFAULT NULL AFTER icon_key'
        );
    }
}

function seed_missing_default_portfolio(PDO $pdo) {
    $exists = $pdo->prepare('SELECT id FROM portfolio_projects WHERE title = :title LIMIT 1');
    $updateGithub = $pdo->prepare(
        'UPDATE portfolio_projects SET github_url = :github_url
         WHERE title = :title AND (github_url IS NULL OR github_url = \'\' OR github_url = \'#\')'
    );
    $updateSort = $pdo->prepare(
        'UPDATE portfolio_projects SET sort_order = :sort_order WHERE title = :title'
    );
    $updateImage = $pdo->prepare(
        'UPDATE portfolio_projects SET image_path = :image_path WHERE title = :title'
    );
    $insert = $pdo->prepare(
        'INSERT INTO portfolio_projects
            (title, category, category_label, description, icon_key, image_path, technologies_json, duration, team_size, features_json, live_url, github_url, sort_order)
         VALUES
            (:title, :category, :category_label, :description, :icon_key, :image_path, :technologies_json, :duration, :team_size, :features_json, :live_url, :github_url, :sort_order)'
    );

    $rows = default_portfolio_seed_rows();
    $total = count($rows);
    foreach ($rows as $i => $project) {
        $sortOrder = $total - $i;

        $exists->execute(['title' => $project['title']]);
        if ($exists->fetch()) {
            $updateGithub->execute([
                'title' => $project['title'],
                'github_url' => $project['github_url'],
            ]);
            $updateSort->execute([
                'title' => $project['title'],
                'sort_order' => $sortOrder,
            ]);
            if (!empty($project['image_path'])) {
                $updateImage->execute([
                    'title' => $project['title'],
                    'image_path' => $project['image_path'],
                ]);
            }
            continue;
        }

        $insert->execute([
            'title' => $project['title'],
            'category' => $project['category'],
            'category_label' => $project['category_label'],
            'description' => $project['description'],
            'icon_key' => $project['icon_key'],
            'image_path' => $project['image_path'] ?? null,
            'technologies_json' => json_encode($project['technologies']),
            'duration' => $project['duration'],
            'team_size' => $project['team_size'],
            'features_json' => json_encode($project['features']),
            'live_url' => $project['live_url'],
            'github_url' => $project['github_url'],
            'sort_order' => $sortOrder
        ]);
    }
}

try {
    $pdo = blog_pdo();
    ensure_portfolio_image_column($pdo);
    seed_missing_default_portfolio($pdo);
    $stmt = $pdo->query(
        'SELECT id, title, category, category_label, description, icon_key, image_path, technologies_json,
                duration, team_size, features_json, live_url, github_url
         FROM portfolio_projects
         ORDER BY sort_order DESC, id DESC'
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
            'imageUrl' => !empty($row['image_path']) ? $row['image_path'] : '',
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
