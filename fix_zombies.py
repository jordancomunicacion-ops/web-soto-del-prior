import os

dirs = [
    '/root/SOTOdelPRIOR/apps/reservas',
    '/root/SOTOdelPRIOR/apps/crm',
    '/root/SOTOdelPRIOR/apps/cocina',
    '/root/SOTOdelPRIOR/apps/ganaderia',
    '/root/SOTOdelPRIOR/apps/oteyzerena',
    '/root/SOTOdelPRIOR/apps/webmontagu',
    '/root/SOTOdelPRIOR/apps/web',
]

for base_dir in dirs:
    file_path = os.path.join(base_dir, 'docker-compose.yml')
    if not os.path.exists(file_path):
        print(f"Skipping {file_path} (not found)")
        continue
    
    with open(file_path, 'r') as f:
        lines = f.readlines()
    
    if any('init: true' in l for l in lines):
        print(f"Skipping {file_path} (already has init: true)")
        continue
        
    new_lines = []
    updated = False
    for line in lines:
        new_lines.append(line)
        # Match indented restart: unless-stopped
        if '    restart: unless-stopped' in line:
            indent = line[:line.find('restart')]
            new_lines.append(f'{indent}init: true\n')
            updated = True
            
    if updated:
        with open(file_path, 'w') as f:
            f.writelines(new_lines)
        print(f"Updated {file_path}")
    else:
        print(f"No changes made to {file_path}")
