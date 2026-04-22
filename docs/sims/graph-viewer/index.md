---
title: Learning Graph Viewer
description: Interactive vis-network viewer for exploring the ecology course learning graph, with search, category filtering, and prerequisite navigation.
image: /sims/graph-viewer/graph-viewer.png
og:image: /sims/graph-viewer/graph-viewer.png
twitter:image: /sims/graph-viewer/graph-viewer.png
hide:
   toc
quality_score: 75
---

# Learning Graph Viewer

<iframe src="./main.html" width="100%" height="600px" scrolling="no"></iframe>

[Run the Learning Graph Viewer Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
Note: This is a vis-network simulation. Drag nodes to rearrange the graph layout.

## About This MicroSim

This interactive viewer displays the complete learning graph for the Ecology course as a network of interconnected concept nodes. Each node represents a key concept, and directed edges show prerequisite relationships -- arrows point from a concept to the concepts it depends on. Foundational concepts with no prerequisites appear on the left side, while advanced concepts that build on multiple prerequisites appear on the right.

Nodes are color-coded by category (e.g., ecosystems, energy flow, biogeochemical cycles, biodiversity) and can be filtered using category checkboxes in the sidebar. A search box lets students quickly find specific concepts and focus on them within the larger graph. Real-time statistics in the sidebar show the count of visible nodes, edges, and foundational concepts.

This tool helps students and instructors see the "big picture" of how ecological concepts connect and build on one another. By exploring which concepts are prerequisites for others, students can identify gaps in their understanding, plan study sequences, and appreciate how topics covered in different chapters are fundamentally linked.

## How to Use

1. **Search for concepts** by typing in the search box. Click on a search result to focus the view on that node and highlight its connections.
2. **Filter by category** using the checkboxes in the sidebar. Use "Check All" or "Uncheck All" for bulk operations.
3. **Navigate the graph** by dragging to pan, scrolling to zoom, and clicking nodes to select them and highlight their connections.
4. **Read prerequisite relationships** by following the directed edges. Arrows point from a concept to the concepts it depends on.
5. **View statistics** in the sidebar to see how many nodes and edges are currently visible.
6. **Identify foundational concepts** on the left side of the graph -- these are starting points with no prerequisites.
7. **Explore advanced topics** on the right side to see which concepts require the most prerequisites.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ecology/sims/graph-viewer/main.html"
        height="600px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9-12 (High School Environmental Science)

### Duration

30 minutes

### Learning Objectives

- Navigate the ecology learning graph to identify foundational concepts and their advanced dependents.
- Trace prerequisite chains to understand how early concepts support later topics.
- Identify clusters of related concepts that form major themes in ecology.
- Use the learning graph to plan study sequences and identify knowledge gaps.

### Prerequisites

- Enrollment in or familiarity with a high school ecology or environmental science course
- Basic ability to navigate interactive web applications

### Standards Alignment

- **NGSS Science and Engineering Practices**: Developing and Using Models
- **AP Environmental Science**: Course overview and concept mapping

### Activities

1. **Warm-Up** (5 min): Ask students: "If you had to teach ecology to a younger student, what topic would you start with and why?" Discuss the idea that some concepts must be learned before others.

2. **Exploration** (10 min): Students open the learning graph and explore freely. They identify the five most foundational concepts (leftmost nodes with many outgoing edges) and the five most advanced concepts (rightmost nodes with many incoming edges). They record these in a table.

3. **Guided Investigation** (10 min): Students pick one advanced concept they find interesting. They trace the prerequisite chain backward through the graph, recording every foundational concept needed to understand their chosen topic. How many prerequisites are there? Which foundational concept appears in the most chains?

4. **Reflection** (5 min): Students self-assess: Which concepts in their prerequisite chain do they already understand? Which ones need review? They create a personal study plan prioritizing the concepts they have not yet mastered.

### Assessment Questions

1. Using the learning graph, identify three foundational concepts that support the study of "ecosystem services." Why must these be understood first?
2. Which concept in the learning graph has the most prerequisite connections? What does this tell you about the complexity of that topic?
3. Explain why understanding the learning graph's structure can help you study more efficiently for an ecology exam.
4. Two students want to study biodiversity. One starts with species interactions and the other starts with biogeochemical cycles. Using the graph, determine which starting point provides a more complete foundation.

## References

1. Novak, J. D., & Canas, A. J. (2008). The theory underlying concept maps and how to construct and use them. *Technical Report IHMC CmapTools 2006-01 Rev 01-2008*.
2. National Research Council. (2012). *A Framework for K-12 Science Education: Practices, Crosscutting Concepts, and Core Ideas*. The National Academies Press.
