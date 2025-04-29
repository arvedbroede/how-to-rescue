document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchInput').addEventListener('input', function() {
        var searchTerm = this.value.toLowerCase();
        var guides = document.querySelectorAll('.quick-guide');
        
        guides.forEach(function(guide) {
            var heading = guide.querySelector('h3').innerText.toLowerCase();
            var guideMatches = heading.includes(searchTerm);

            if (guideMatches) { 
                guide.style.display = 'block';
            } else {
                guide.style.display = 'none';
            }
        });
    });
});
