<?php
require_once __DIR__ . '/blog_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    blog_json(['error' => 'Method not allowed'], 405);
}

function default_services_seed_rows() {
    return [
        [
            'slug' => 'software-development',
            'title' => 'Software Development',
            'icon_key' => 'code',
            'description' => 'Custom software solutions built with modern technologies. From desktop applications to enterprise software, we create scalable and efficient solutions tailored to your business needs.',
            'features' => [
                'Custom Desktop Applications',
                'Enterprise Software Solutions',
                'API Development & Integration',
                'Database Design & Management',
                'Software Maintenance & Support',
                'Code Review & Quality Assurance'
            ]
        ],
        [
            'slug' => 'web-development',
            'title' => 'Web Development',
            'icon_key' => 'rocket',
            'description' => 'Responsive, modern websites and web applications. We build fast, SEO-optimized websites using the latest frameworks and technologies to enhance your online presence.',
            'features' => [
                'Responsive Website Design',
                'E-commerce Solutions',
                'Web Application Development',
                'SEO Optimization',
                'Performance Optimization',
                'Content Management Systems'
            ]
        ],
        [
            'slug' => 'app-development',
            'title' => 'App Development',
            'icon_key' => 'mobile',
            'description' => 'Native and cross-platform mobile applications for iOS and Android. We create user-friendly, feature-rich apps that engage your customers and drive business growth.',
            'features' => [
                'Native iOS & Android Apps',
                'Cross-Platform Development',
                'Mobile UI/UX Design',
                'App Store Deployment',
                'Push Notifications',
                'App Performance Optimization'
            ]
        ],
        [
            'slug' => 'social-media',
            'title' => 'Social Media Management',
            'icon_key' => 'users',
            'description' => 'Complete social media strategy and management services. We help you build your brand, engage with your audience, and grow your social media presence across all platforms.',
            'features' => [
                'Social Media Strategy',
                'Content Creation & Curation',
                'Community Management',
                'Social Media Advertising',
                'Analytics & Reporting',
                'Brand Building & Engagement'
            ]
        ],
        [
            'slug' => 'crm-solutions',
            'title' => 'CRM Solutions',
            'icon_key' => 'database',
            'description' => 'Customer Relationship Management systems to streamline your business processes. We implement and customize CRM solutions to improve customer satisfaction and sales efficiency.',
            'features' => [
                'CRM Implementation & Setup',
                'Custom CRM Development',
                'Data Migration & Integration',
                'Sales Pipeline Management',
                'Customer Analytics',
                'Training & Support'
            ]
        ],
        [
            'slug' => 'graphic-design',
            'title' => 'Graphic Design',
            'icon_key' => 'chart',
            'description' => 'Creative visual solutions including logos, branding, marketing materials, and UI/UX design. We create compelling visuals that represent your brand and attract customers.',
            'features' => [
                'Logo & Brand Identity',
                'Marketing Materials Design',
                'UI/UX Design',
                'Print Design Services',
                'Digital Graphics',
                'Brand Guidelines Development'
            ]
        ],
        [
            'slug' => 'ai-bot-development',
            'title' => 'AI Bot Development',
            'icon_key' => 'robot',
            'description' => 'Intelligent chatbots and AI-powered solutions to automate customer service, improve user experience, and streamline business operations with cutting-edge AI technology.',
            'features' => [
                'Chatbot Development',
                'AI-Powered Customer Service',
                'Natural Language Processing',
                'Voice Assistant Integration',
                'Machine Learning Solutions',
                'Automation & Workflow Optimization'
            ]
        ]
    ];
}

function seed_missing_default_services(PDO $pdo) {
    $exists = $pdo->prepare('SELECT id FROM cms_services WHERE slug = :slug LIMIT 1');
    $insert = $pdo->prepare(
        'INSERT INTO cms_services (slug, title, icon_key, description, features_json, sort_order)
         VALUES (:slug, :title, :icon_key, :description, :features_json, :sort_order)'
    );

    $sortOrder = (int)$pdo->query('SELECT COALESCE(MAX(sort_order), 0) FROM cms_services')->fetchColumn() + 1;
    foreach (default_services_seed_rows() as $service) {
        $exists->execute(['slug' => $service['slug']]);
        if ($exists->fetch()) {
            continue;
        }

        $insert->execute([
            'slug' => $service['slug'],
            'title' => $service['title'],
            'icon_key' => $service['icon_key'],
            'description' => $service['description'],
            'features_json' => json_encode($service['features']),
            'sort_order' => $sortOrder
        ]);
        $sortOrder++;
    }
}

try {
    $pdo = blog_pdo();
    seed_missing_default_services($pdo);
    $stmt = $pdo->query(
        'SELECT id, slug, title, icon_key, description, features_json
         FROM cms_services
         ORDER BY sort_order ASC, id ASC'
    );
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $out = [];
    foreach ($rows as $row) {
        $features = [];
        if (!empty($row['features_json'])) {
            $d = is_string($row['features_json'])
                ? json_decode($row['features_json'], true)
                : $row['features_json'];
            $features = is_array($d) ? $d : [];
        }
        $out[] = [
            'dbId' => (int)$row['id'],
            'id' => $row['slug'],
            'slug' => $row['slug'],
            'title' => $row['title'],
            'iconKey' => $row['icon_key'] ?: 'code',
            'description' => $row['description'],
            'features' => $features
        ];
    }
    blog_json($out);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
